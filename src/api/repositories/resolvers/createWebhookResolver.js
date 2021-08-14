import { createWebhookForRepository, getWebhookByUrl } from "src/libs/github";
import { ApolloError } from "apollo-server-errors";
import { registryOpenApi } from "src/api/openApi/helpers/registryOpenApi";

export const createWebhookResolver = async ({ session, prisma }, { repositoryId, repositoryName, filePath, branchName }) => {
  const { userId } = session;
  const repository = await prisma.repository.findUnique({ where: { id: repositoryId } });

  if (repository?.enabled) throw new ApolloError("Webhook for this repository has already been created", "409");

  const openApi = repository ? await prisma.openApi.findFirst({ where: { repositoryId: repository.id } }) : null;
  const account = await prisma.account.findUnique({ where: { userId } });

  const newRepository = {
    id: repositoryId,
    userId,
    filePath: filePath[0] === "/" ? filePath.substring(1) : filePath,
    branchName,
    name: repositoryName,
    enabled: true,
  };

  // Creating Webhook in GitHub
  let webhookId;
  try {
    let response = await createWebhookForRepository(repositoryName, account.accessToken);
    webhookId = response.id;
  } catch (e) {
    if (e.response.status === 422) {
      const webhook = await getWebhookByUrl(repositoryName, account.accessToken);
      console.log({ webhook });
      webhookId = webhook.id;
    }
  }
  // Database
  if (repository) {
    await prisma.repository.update({
      where: {
        id: repositoryId,
      },
      data: {
        ...newRepository,
        webhookId,
      },
    });
  } else {
    await prisma.repository.create({ data: { ...newRepository, webhookId } });
  }

  await registryOpenApi(openApi, prisma, newRepository);
};
