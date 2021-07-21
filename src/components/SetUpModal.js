import { useEffect, useReducer, useState } from "react";
import { AiOutlineClose, AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";
import { gql, useMutation } from "@apollo/client";
import client from "../../apollo-client";
import { GET_REPOSITORIES } from "./RepositoryList";
import { SetUpModalReducer, SetUpModalInitialState } from "@/reducers/SetUpModalReducer";
import { delayBounceFn } from "src/libs/timer";

export const GET_SWAGGER = gql`
  query swaggerFromRepository($repositoryName: String!, $filePath: String!, $branchName: String!) {
    swaggerFromRepository(repositoryName: $repositoryName, branchName: $branchName, filePath: $filePath) {
      content
      error
    }
  }
`;
export const GET_BRANCHES = gql`
  query Branches($repositoryName: String) {
    branches(repositoryName: $repositoryName) {
      name
    }
  }
`;

const CREATE_WEBHOOK = gql`
  mutation CreateDraftMutation($data: CreateWebhookInput!) {
    createWebhook(data: $data) {
      name
      hasWebhook
      id
    }
  }
`;

export const SetUpModal = ({ repository, isHidden, toggleIsSetUpModalHidden }) => {
  const mutationConfig = {
    refetchQueries: [{ query: GET_REPOSITORIES }],
    awaitRefetchQueries: true,
  };
  const [state, dispatch] = useReducer(SetUpModalReducer, SetUpModalInitialState);

  const { branchName, isBranchNameValid, isBranchNameLoading, filePath, isFilePathValid, isFilePathLoading, branches } = state;

  const [createWebhook, { loading: createWebhookLoading }] = useMutation(CREATE_WEBHOOK, mutationConfig);

  useEffect(() => {
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
  }, [branchName, repository, branches]);

  useEffect(() => {
    if (!filePath || !branchName || !isBranchNameValid) return dispatch({ type: "FILE_PATH_DEPENDENCIES_INVALID" });

    dispatch({ type: "FILE_PATH_CHECK_IN_PROGRESS" });

    return delayBounceFn(() => {
      client
        .query({ query: GET_SWAGGER, variables: { repositoryName: repository.name, branchName, filePath }, errorPolicy: "ignore" })
        .then(({ data }) => {
          dispatch({ type: "FILE_PATH_CHECK", data });
        });
    }, 1000);
  }, [filePath, branchName, isBranchNameValid, repository]);

  return (
    <div
      className={`${isHidden ? "hidden" : ""} fixed left-0 bottom-0 top-0 right-0 flex justify-center items-center z-10 pb-40`}
      style={{ background: "rgba(0,0,0,0.9)" }}
      onClick={() => toggleIsSetUpModalHidden()}
    >
      <div
        className={`w-1/4 h-1/2 rounded-xl px-8 flex flex-col justify-evenly relative`}
        style={{ background: "rgba(255,255,255,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose size={24} className="absolute right-4 top-4 cursor-pointer" onClick={() => toggleIsSetUpModalHidden()} />

        <div className="">
          <h3 className="text-xl font-semibold">Setting up your project</h3>
          <p className="font-light text-sm mt-2">
            Select the branch to watch and the path where the swagger file is stocked in the repository
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center relative">
            <label className="w-24">Branch name</label>
            <input
              className="ml-4 p-2 pl-3 bg-gray-200 rounded-md outline-none flex-grow border border-gray-300"
              placeholder="main"
              required
              onChange={(e) =>
                dispatch({
                  type: "FIELD",
                  fieldName: "branchName",
                  payload: e.currentTarget.value,
                })
              }
            />
            <div className={`w-6 ml-2`}>
              <AiOutlineWarning
                className={`${isBranchNameValid !== null && !isBranchNameValid && !isBranchNameLoading ? "" : "hidden"}`}
                size={24}
                color="#EF4444"
              />
              <AiOutlineCheckCircle className={`${isBranchNameValid && !isBranchNameLoading ? "" : "hidden"}`} size={24} color="#10B981" />
              <BiLoaderAlt className={`animate-spin ${isBranchNameLoading ? "" : "hidden"}`} size={24} />
            </div>
          </div>
          <div className="flex justify-between items-center mt-8">
            <label className="w-24">File path</label>
            <input
              className="ml-4 p-2 pl-3 bg-gray-200 rounded-md outline-none flex-grow"
              placeholder="/src/doc/swagger.yml"
              required
              onChange={(e) =>
                dispatch({
                  type: "FIELD",
                  fieldName: "filePath",
                  payload: e.currentTarget.value,
                })
              }
            />
            <div className={`w-6 ml-2`}>
              <AiOutlineWarning
                className={`${isFilePathValid !== null && !isFilePathValid && !isFilePathLoading ? "" : "hidden"}`}
                size={24}
                color="#EF4444"
              />
              <AiOutlineCheckCircle className={`${isFilePathValid && !isFilePathLoading ? "" : "hidden"}`} size={24} color="#10B981" />
              <BiLoaderAlt className={`animate-spin ${isFilePathLoading ? "" : "hidden"}`} size={24} />
            </div>
          </div>
        </div>
        <button
          className="w-5/6 h-12 bg-gray-600 rounded-md self-center disabled:bg-gray-600 disabled:opacity-60 disabled:cursor-default text-white flex justify-center items-center"
          type="submit"
          disabled={!isFilePathValid || !isBranchNameValid || createWebhookLoading}
          onClick={() =>
            createWebhook({ variables: { data: { repositoryId: repository.id, repositoryName: repository.name, branchName, filePath } } })
          }
        >
          {createWebhookLoading ? <BiLoaderAlt className={`animate-spin ${createWebhookLoading ? "" : "hidden"}`} size={24} /> : "Let's go"}
        </button>
      </div>
    </div>
  );
};
