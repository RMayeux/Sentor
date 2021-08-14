import { toast } from "react-toastify";

export const repositoryFollowButtonAction = (repository, deleteWebhook, toggleIsSetUpModalHidden) => {
  console.log({ repository });
  if (repository.hasWebhook)
    return deleteWebhook({ variables: { data: { repositoryId: repository.id, repositoryName: repository.full_name } } }).then(() =>
      toast.success("Project unfollowed", { autoClose: 2000 })
    );

  return toggleIsSetUpModalHidden(true);
};
