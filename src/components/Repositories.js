import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FollowButton } from "./FollowButton";
import { SetUpModal } from "./SetUpModal";

export const GET_REPOSITORIES = gql`
  query Query {
    repositories {
      id
      name
      hasWebhook
    }
  }
`;

export const Repositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES);
  const [hookedRepositories, setHookedRepositories] = useState([]);
  const [nonHookedRepositories, setNonHookedRepositories] = useState([]);

  useEffect(() => {
    if (data) {
      setHookedRepositories(data.repositories.filter((repository) => repository.hasWebhook));
      setNonHookedRepositories(data.repositories.filter((repository) => !repository.hasWebhook));
    }
  }, [data]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  const RepositoriesComponent = ({ repositories }) => {
    return repositories.map((repository) => {
      const [isSetUpModalHidden, setIsSetUpModalHidden] = useState(true);
      const toggleIsSetUpModalHidden = () => setIsSetUpModalHidden((current) => !current);
      return (
        <>
          <li className="h-16 flex items-center bg-gray-100 rounded-md	w-2/6 m-4 border border-gray-400 relative">
            <h3 className="ml-4 text-lg">{repository.name}</h3>
            <FollowButton repository={repository} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
          </li>
          <SetUpModal repository={repository} isHidden={isSetUpModalHidden} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
        </>
      );
    });
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
