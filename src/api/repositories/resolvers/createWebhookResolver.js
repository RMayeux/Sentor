import { createWebhookForRepository } from "src/libs/github";
import { ApolloError } from "apollo-server-errors";
import { registryOpenApi } from "src/api/openApi/helpers/registryOpenApi";

export const createWebhookResolver = async ({ session, prisma }, { repositoryId, repositoryName, filePath, branchName }) => {
  const { userId } = session;
  const webhook = await prisma.webhook.findUnique({ where: { repositoryId } });
  if (webhook) throw new ApolloError("Webhook for this repository has already been created", "409");

  const [account, openApi] = await Promise.all([prisma.account.findUnique({ where: { userId } }), prisma.openApi.findFirst()]);
  const newWebhook = { repositoryId, userId, filePath, branchName };

  const [{ id }] = await Promise.all([
    createWebhookForRepository(session.user.name, repositoryName, account.accessToken),
    registryOpenApi(openApi, session, repositoryName, prisma, newWebhook),
  ]);

  await prisma.webhook.create({ data: { ...newWebhook, id } });
};
