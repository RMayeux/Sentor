import { createWebhookForRepository } from "src/libs/github";
import { ApolloError } from "apollo-server-errors";

export const createWebhookResolver = async ({ session, prisma }, { repositoryId, repositoryName }) => {
  let webhook = await prisma.webhook.findUnique({ where: { repositoryId } });
  if (webhook) throw new ApolloError("Webhook for this repository has already been created", "409");

  const account = await prisma.account.findUnique({ where: { userId: session.id } });
  const { id } = await createWebhookForRepository(session.user.name, repositoryName, account.accessToken);
  await Promise.all([prisma.webhook.create({ data: { repositoryId: repositoryId, userId: session.id, id } })]);
};
