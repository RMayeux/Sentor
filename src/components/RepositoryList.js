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
      full_name
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
    <ul className="divide-y divide-gray-300 py-2 px-1 shadow-lg flex-grow">
      <RepositoriesComponent repositories={hookedRepositories} />
      <RepositoriesComponent repositories={nonHookedRepositories} />
    </ul>
  );
};
