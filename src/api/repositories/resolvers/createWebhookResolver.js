import { createWebhookForRepository, getWebhookByUrl } from "src/libs/github";
import { ApolloError } from "apollo-server-errors";
import { registryOpenApi } from "src/api/openApi/helpers/registryOpenApi";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createWebhookResolver = async ({ session }, { repositoryId, repositoryName, filePath, branchName }) => {
  const { userId } = session;
  const repository = await prisma.repository.findUnique({ where: { id: repositoryId } });

  if (repository?.enabled) throw new ApolloError("Webhook for this repository has already been created", "409");

  const openApi = await getOpenApi(repository);
  const account = await prisma.account.findUnique({ where: { userId } });
  const webhookId = await processWebhook(repositoryName, account);

  const newRepository = {
    id: repositoryId,
    userId,
    filePath: filePath[0] === "/" ? filePath.substring(1) : filePath,
    branchName,
    name: repositoryName,
    enabled: true,
    webhookId,
  };

  await Promise.all([processRepository(repository, newRepository), registryOpenApi(openApi, newRepository)]);
};

const processWebhook = async (repositoryName, account) => {
  try {
    let response = await createWebhookForRepository(repositoryName, account.accessToken);
    return response.id;
  } catch (e) {
    if (e.response.status === 422) {
      const webhook = await getWebhookByUrl(repositoryName, account.accessToken);
      return webhook.id;
    }
  }
};

const processRepository = async (repository, newRepository) => {
  if (repository) {
    await prisma.repository.update({
      where: {
        id: newRepository.repositoryId,
      },
      data: {
        ...newRepository,
        webhookId: newRepository.webhookId,
      },
    });
  } else {
    await prisma.repository.create({ data: { ...newRepository, webhookId: newRepository.webhookId } });
  }
};

const getOpenApi = async (repository) => (repository ? await prisma.openApi.findFirst({ where: { repositoryId: repository.id } }) : null);
