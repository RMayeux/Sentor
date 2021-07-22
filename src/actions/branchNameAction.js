import { delayBounceFn } from "src/libs/timer";
import { gql } from "@apollo/client";
import client from "../../apollo-client";

export const GET_BRANCHES = gql`
  query Branches($repositoryName: String) {
    branches(repositoryName: $repositoryName) {
      name
    }
  }
`;

export const branchNameAction = (branchName, repository, branches, dispatch) => {
  if (!branchName) return dispatch({ type: "BRANCH_NAME_DEPENDENCIES_INVALID" });

  dispatch({ type: "BRANCH_NAME_CHECK_IN_PROGRESS" });

  return delayBounceFn(() => {
    if (!branches) {
      client
        .query({ query: GET_BRANCHES, variables: { repositoryName: repository.name } })
        .then(({ data }) => dispatch({ type: "BRANCHES_INIT", data }));
    }

    dispatch({ type: "BRANCH_NAME_CHECK" });
  }, 1000);
}