import { toast } from "react-toastify";

export const repositoryFollowButtonAction = (repository, deleteWebhook, toggleIsSetUpModalHidden) => {
  if (repository.hasWebhook)
    return deleteWebhook({ variables: { data: { repositoryId: repository.id, repositoryName: repository.name } } }).then(() =>
      toast.success("Project unfollowed", { autoClose: 2000 })
    );

  return toggleIsSetUpModalHidden(true);
};
