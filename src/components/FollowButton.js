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

export const FollowButton = ({ repository, toggleIsSetUpModalHidden }) => {
  const mutationConfig = {
    refetchQueries: [{ query: GET_REPOSITORIES }],
    awaitRefetchQueries: true,
  };
  const [deleteWebhook, { loading }] = useMutation(DELETE_WEBHOOK, mutationConfig);

  const webhookAction = () => {
    const body = { variables: { data: { repositoryId: repository.id, repositoryName: repository.name } } };
    if (repository.hasWebhook) deleteWebhook(body).then(() => toast.success("Project unfollowed", { autoClose: 2000 }));
    else toggleIsSetUpModalHidden(true);
  };

  return (
    <button
      onClick={() => webhookAction()}
      className={`w-24 h-12 ${
        repository.hasWebhook ? "bg-red-500" : "bg-gray-600"
      } rounded-md self-end absolute right-2 top-2 text-white flex justify-center items-center`}
    >
      {loading ? <BiLoaderAlt className="animate-spin" size={24} /> : repository.hasWebhook ? "Unfollow" : "Set up"}
    </button>
  );
};
