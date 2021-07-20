import { extendType, stringArg } from "nexus";
import { getBranchesResolver } from "./resolvers/getBranchesResolver";

const repositoryQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("branches", {
      args: {
        repositoryName: stringArg(),
      },
      type: "Branch",
      resolve: async (_parent, args, context) => getBranchesResolver(context, args),
    });
  },
});

export default repositoryQueries;
