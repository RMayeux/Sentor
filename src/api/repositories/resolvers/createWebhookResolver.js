import { createWebhookForRepository, getWebhookByUrl } from "src/libs/github";
import { ApolloError } from "apollo-server-errors";
import { registryOpenApi } from "src/api/openApi/helpers/registryOpenApi";

export const createWebhookResolver = async ({ session, prisma }, { repositoryId, repositoryName, filePath, branchName }) => {
  const { userId } = session;
  const repository = await prisma.repository.findUnique({ where: { id: repositoryId } });

  if (repository?.enabled) throw new ApolloError("Webhook for this repository has already been created", "409");

  const [account, openApi] = await Promise.all([prisma.account.findUnique({ where: { userId } }), prisma.openApi.findFirst()]);

  const newRepository = {
    id: repositoryId,
    userId,
    filePath,
    branchName,
    name: repositoryName,
    enabled: true,
  };

  let webhookId;
  // Creating Webhook in GitHub
  try {
    let response = await createWebhookForRepository(session.user.name, repositoryName, account.accessToken);
    webhookId = response.id;
  } catch (e) {
    if (e.response.status == "429") {
      const webhook = await getWebhookByUrl(session.user.name, repositoryName, account.accessToken);
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
        enabled: true,
        webhookId,
      },
    });
  } else {
    await prisma.repository.create({ data: { ...newRepository, webhookId } });
  }
  await registryOpenApi(openApi, session, repositoryName, prisma, newRepository);
};
