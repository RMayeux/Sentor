import { extendType, stringArg } from "nexus";
import { getSwaggerFromRepositoryResolver } from "./resolvers/getSwaggerFromRepositoryResolver";

const swaggerQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("swaggerFromRepository", {
      type: "Swagger",
      args: {
        repositoryName: stringArg(),
        filePath: stringArg(),
        branchName: stringArg(),
      },
      resolve: async (_parent, args, context) => getSwaggerFromRepositoryResolver(context, args),
    });
  },
});

export default swaggerQueries;
