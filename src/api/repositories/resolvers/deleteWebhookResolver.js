import { deleteWebhookForRepository } from "src/libs/github";

export const deleteWebhookResolver = async ({ prisma, session }, { repositoryId, repositoryName }) => {
  const webhook = await prisma.webhook.findUnique({ where: { repositoryId } });
  if (!webhook) return;

  const account = await prisma.account.findUnique({ where: { userId: session.id } });

  await Promise.all([
    prisma.webhook.delete({ where: { repositoryId } }),
    deleteWebhookForRepository(session.user.name, repositoryName, webhook.id, account.accessToken),
  ]);
};
