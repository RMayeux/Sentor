import { gql, useMutation } from "@apollo/client";
import { GET_REPOSITORIES } from "./Repositories";
const CREATE_WEBHOOK = gql`
  mutation CreateDraftMutation($data: CreateWebhookInput!) {
    createWebhook(data: $data) {
      name
      hasWebhook
      id
    }
  }
`;

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
  const [createWebhook] = useMutation(CREATE_WEBHOOK, mutationConfig);
  const [deleteWebhook] = useMutation(DELETE_WEBHOOK, mutationConfig);

  const webhookAction = () => {
    const body = { variables: { data: { repositoryId: repository.id, repositoryName: repository.name } } };
    if (repository.hasWebhook) deleteWebhook(body);
    else toggleIsSetUpModalHidden(body);
  };

  return (
    <button onClick={() => webhookAction()} className="w-24 h-12 bg-gray-300 rounded-md self-end absolute right-2 top-2">
      {repository.hasWebhook ? "Unfollow" : "Set up"}
    </button>
  );
};
