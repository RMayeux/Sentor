import { getBranchesForRepository } from "src/libs/github";

export const getBranchesResolver = async ({ session }, { repositoryName }) => {
  return getBranchesForRepository(session.user.name, repositoryName);
};
