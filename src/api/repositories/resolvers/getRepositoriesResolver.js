import { getRepositories } from "src/libs/github";

export const getRepositoriesResolver = async ({ session, prisma }) => {
  const [webhooks, repositories] = await Promise.all([
    prisma.webhook.findMany({ where: { userId: session.id } }),
    getRepositories(session.user.name),
  ]);

  for (const repository of repositories) {
    repository.hasWebhook = !!webhooks.find((webhook) => repository.id === webhook.repositoryId);
  }

  return repositories;
};
