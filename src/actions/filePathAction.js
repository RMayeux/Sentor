import { delayBounceFn } from "src/libs/timer";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

export const GET_SWAGGER = gql`
  query swaggerFromRepository($repositoryName: String!, $filePath: String!, $branchName: String!) {
    swaggerFromRepository(repositoryName: $repositoryName, branchName: $branchName, filePath: $filePath) {
      content
      error
    }
  }
`;

export const filePathAction = (filePath, branchName, isBranchNameValid, dispatch, repository) => {
  if (!filePath || !branchName || !isBranchNameValid) return dispatch({ type: "FILE_PATH_DEPENDENCIES_INVALID" });

  dispatch({ type: "FILE_PATH_CHECK_IN_PROGRESS" });

  return delayBounceFn(() => {
    client
      .query({ query: GET_SWAGGER, variables: { repositoryName: repository.name, branchName, filePath }, errorPolicy: "ignore" })
      .then(({ data }) => {
        dispatch({ type: "FILE_PATH_CHECK", data });
      });
  }, 1000);
}