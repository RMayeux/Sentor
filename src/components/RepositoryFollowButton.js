import { gql, useMutation } from "@apollo/client";
import { GET_REPOSITORIES } from "./RepositoryList";
import { BiLoaderAlt } from "react-icons/bi";
import { repositoryFollowButtonAction } from "src/actions/repositoryFollowButtonAction";

const DELETE_WEBHOOK = gql`
  mutation CreateDraftMutation($data: DeleteWebhookInput!) {
    deleteWebhook(data: $data) {
      name
      hasWebhook
      id
    }
  }
`;

export const RepositoryFollowButton = ({ repository, toggleIsSetUpModalHidden }) => {
  const [deleteWebhook, { loading }] = useMutation(DELETE_WEBHOOK, {
    refetchQueries: [{ query: GET_REPOSITORIES }],
    awaitRefetchQueries: true,
  });

  return (
    <button
      onClick={() => repositoryFollowButtonAction(repository, deleteWebhook, toggleIsSetUpModalHidden)}
      className={`w-24 h-12 ${
        repository.hasWebhook ? "bg-red-500" : "bg-gray-600"
      } rounded-md self-end absolute right-2 top-2 text-white flex justify-center items-center mr-2`}
    >
      {loading ? <BiLoaderAlt className="animate-spin" size={24} /> : repository.hasWebhook ? "Unfollow" : "Set up"}
    </button>
  );
};
