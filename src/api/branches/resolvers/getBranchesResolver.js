import { getBranchesForRepository } from "src/libs/github";

export const getBranchesResolver = async ({ repositoryName }) => {
  return getBranchesForRepository(repositoryName);
};
