import { gql, useMutation } from "@apollo/client";
import { GET_REPOSITORIES } from "./RepositoryList";
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from "react-toastify";

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

  const buttonAction = () => {
    if (repository.hasWebhook)
      return deleteWebhook({ variables: { data: { repositoryId: repository.id, repositoryName: repository.name } } }).then(() =>
        toast.success("Project unfollowed", { autoClose: 2000 })
      );
    
    return toggleIsSetUpModalHidden(true);
  };

  return (
    <button
      onClick={() => buttonAction()}
      className={`w-24 h-12 ${
        repository.hasWebhook ? "bg-red-500" : "bg-gray-600"
      } rounded-md self-end absolute right-2 top-2 text-white flex justify-center items-center`}
    >
      {loading ? <BiLoaderAlt className="animate-spin" size={24} /> : repository.hasWebhook ? "Unfollow" : "Set up"}
    </button>
  );
};
