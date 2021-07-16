import { extendType } from "nexus";
import { getRepositoriesResolver } from "src/api/repositories/resolvers/getRepositoriesResolver";

const repositoryQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("repositories", {
      type: "Repository",
      resolve: async (_parent, args, context) => getRepositoriesResolver(context),
    });
  },
});

export default repositoryQueries;
