import { ApolloError } from "node_modules/apollo-server-core/dist/index";
import { getRepositories } from "src/libs/github";

export const getRepositoriesResolver = async ({ session, prisma }) => {
  try {
    const [dbRepositories, gitHubRepositories] = await Promise.all([
      prisma.repository.findMany({ where: { userId: session.userId } }),
      getRepositories(session.user.name),
    ]);

    for (const repository of gitHubRepositories) {
      repository.hasWebhook = !!dbRepositories.find((dbRepository) => repository.id === dbRepository.id && dbRepository.enabled);
    }
    return gitHubRepositories;
  } catch (e) {
    console.log({ e });
    throw new ApolloError("Could not fetch repositories", "ERROR", {});
  }
};
