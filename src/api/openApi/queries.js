import { extendType, stringArg } from "nexus";
import { getOpenApiFromRepositoryResolver } from "./resolvers/getOpenApiFromRepositoryResolver";

const openApiQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("openApiFromRepository", {
      type: "OpenApi",
      args: {
        repositoryName: stringArg(),
        filePath: stringArg(),
        branchName: stringArg(),
      },
      resolve: async (_parent, args) => getOpenApiFromRepositoryResolver(args),
    });
  },
});

export default openApiQueries;
