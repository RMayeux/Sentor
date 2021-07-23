import { ApolloError } from "apollo-server-errors";
import { getContent } from "src/libs/github";
import SwaggerParser from "@apidevtools/swagger-parser";

export const getOpenApiFromRepositoryResolver = async ({ session }, { repositoryName, branchName, filePath }) => {
  let response;

  try {
    response = await getContent(session.user.name, repositoryName, branchName, filePath);
  } catch (e) {
    if (e.response.status === 404) throw new ApolloError("File not found", "NOT_FOUND", {});
    if (e.response.status === 400) throw new ApolloError("Invalid file path format", "INVALID_FORMAT", {});
    throw new ApolloError(e.response.statusText, "ERROR", {});
  }

  try {
    await SwaggerParser.validate(response.data);
  } catch (error) {
    throw new ApolloError(error, "ERROR", {});
  }

  return {};
};
