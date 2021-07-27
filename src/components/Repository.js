import { useState } from "react";
import { RepositoryFollowButton } from "./RepositoryFollowButton";
import { SetUpModal } from "./SetUpModal";

export const Repository = ({ repository }) => {
  const [isSetUpModalHidden, setIsSetUpModalHidden] = useState(true);
  const toggleIsSetUpModalHidden = () => setIsSetUpModalHidden((current) => !current);
  return (
    <>
      <li className="h-16 flex items-center w-full relative ">
        <h3 className="ml-4 text-lg">{repository.name}</h3>
        <RepositoryFollowButton repository={repository} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
      </li>
      <SetUpModal repository={repository} isHidden={isSetUpModalHidden} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
    </>
  );
};
