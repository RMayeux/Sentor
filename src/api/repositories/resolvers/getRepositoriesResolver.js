import { ApolloError } from "node_modules/apollo-server-core/dist/index";
import { getRepositories } from "src/libs/github";

export const getRepositoriesResolver = async ({ session, prisma }) => {
  try {
    const [webhooks, repositories] = await Promise.all([
      prisma.webhook.findMany({ where: { userId: session.userId } }),
      getRepositories(session.user.name),
    ]);

    for (const repository of repositories) {
      repository.hasWebhook = !!webhooks.find((webhook) => repository.id === webhook.repositoryId);
    }

    return repositories;
  } catch (e) {
    throw new ApolloError("Could not fetch repositories", "ERROR", {});
  }
};
