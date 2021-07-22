import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { strInclude } from "src/libs/string";
import { Repository } from "./Repository";

export const GET_REPOSITORIES = gql`
  query Query {
    repositories {
      id
      name
      hasWebhook
    }
  }
`;

export const RepositoryList = ({ repositoryNameFilter }) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES);
  const [hookedRepositories, setHookedRepositories] = useState([]);
  const [nonHookedRepositories, setNonHookedRepositories] = useState([]);

  useEffect(() => {
    if (!data) return;
    setHookedRepositories(data.repositories.filter((repo) => repo.hasWebhook && strInclude(repo.name, repositoryNameFilter)));
    setNonHookedRepositories(data.repositories.filter((repo) => !repo.hasWebhook && strInclude(repo.name, repositoryNameFilter)));
  }, [data, repositoryNameFilter]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return null;

  const RepositoriesComponent = ({ repositories }) => {
    return repositories.map((repository) => <Repository key={repository.id} repository={repository} />);
  };

  return (
    <ul className="w-5/6 mt-4 ml-12">
      {hookedRepositories.length > 0 && <h2 className="text-xl">Followed Repositories</h2>}
      <RepositoriesComponent repositories={hookedRepositories} />
      {nonHookedRepositories.length > 0 && <h2 className="text-xl">Availables Repositories</h2>}
      <RepositoriesComponent repositories={nonHookedRepositories} />
    </ul>
  );
};