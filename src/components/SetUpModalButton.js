import { BiLoaderAlt } from "react-icons/bi";
import { gql, useMutation } from "@apollo/client";
import { GET_REPOSITORIES } from "./RepositoryList";


const CREATE_WEBHOOK = gql`
  mutation CreateDraftMutation($data: CreateWebhookInput!) {
    createWebhook(data: $data) {
      name
      hasWebhook
      id
    }
  }
`;

export const SetUpModalButton = ({ isFilePathValid, isBranchNameValid , repository, branchName, filePath}) => {
  const [createWebhook, { loading: createWebhookLoading }] = useMutation(CREATE_WEBHOOK, {
    refetchQueries: [{ query: GET_REPOSITORIES }],
    awaitRefetchQueries: true,
  });
  return (
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
  )
}