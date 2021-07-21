import { useState } from "react";
import { FollowButton } from "./FollowButton";
import { SetUpModal } from "./SetUpModal";

export const Repository = ({ repository }) => {
  const [isSetUpModalHidden, setIsSetUpModalHidden] = useState(true);
  const toggleIsSetUpModalHidden = () => setIsSetUpModalHidden((current) => !current);
  return (
    <>
      <li className="h-16 flex items-center bg-gray-100 rounded-md	w-full m-4 border border-gray-400 relative">
        <h3 className="ml-4 text-lg">{repository.name}</h3>
        <FollowButton repository={repository} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
      </li>
      <SetUpModal repository={repository} isHidden={isSetUpModalHidden} toggleIsSetUpModalHidden={toggleIsSetUpModalHidden} />
    </>
  );
};
