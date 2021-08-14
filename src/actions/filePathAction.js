import { delayBounceFn } from "src/libs/timer";
import client from "../../apollo-client";
import { gql } from "@apollo/client";

export const GET_SWAGGER = gql`
  query openApiFromRepository($repositoryName: String!, $filePath: String!, $branchName: String!) {
    openApiFromRepository(repositoryName: $repositoryName, branchName: $branchName, filePath: $filePath) {
      content
    }
  }
`;

export const filePathAction = (filePath, branchName, isBranchNameValid, dispatch, repository) => {
  if (!filePath || !branchName || !isBranchNameValid) return dispatch({ type: "FILE_PATH_DEPENDENCIES_INVALID" });

  dispatch({ type: "FILE_PATH_CHECK_IN_PROGRESS" });

  return delayBounceFn(() => {
    client
      .query({ query: GET_SWAGGER, variables: { repositoryName: repository.full_name, branchName, filePath }, errorPolicy: "ignore" })
      .then(({ data }) => {
        dispatch({ type: "FILE_PATH_CHECK", data });
      });
  }, 1000);
};
