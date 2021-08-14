import { deleteWebhookForRepository } from "src/libs/github";

export const deleteWebhookResolver = async ({ prisma, session }, { repositoryId: id, repositoryName }) => {
  const repository = await prisma.repository.findUnique({ where: { id } });
  if (!repository) return;

  const account = await prisma.account.findUnique({ where: { userId: session.userId } });

  await Promise.all([
    prisma.repository.update({ where: { id }, data: { enabled: false } }),
    deleteWebhookForRepository(repositoryName, repository.id, account.accessToken),
  ]);
};
