import { useEffect, useReducer } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SetUpModalReducer, SetUpModalInitialState } from "@/reducers/SetUpModalReducer";
import { branchNameAction } from "src/actions/SetUpModalActions";
import { filePathAction } from "src/actions/filePathAction";
import { SetUpModalInput } from "./SetUpModalInput";
import { SetUpModalButton } from "./SetUpModalButton";

export const SetUpModal = ({ repository, isHidden, toggleIsSetUpModalHidden }) => {
  const [state, dispatch] = useReducer(SetUpModalReducer, SetUpModalInitialState);
  const { branchName, isBranchNameValid, isBranchNameLoading, filePath, isFilePathValid, isFilePathLoading, branches } = state;

  useEffect(() => {
    return branchNameAction(branchName, repository, branches, dispatch);
  }, [branchName, repository, branches]);

  useEffect(() => {
    return filePathAction(filePath, branchName, isBranchNameValid, dispatch, repository);
  }, [filePath, branchName, isBranchNameValid, repository]);

  return (
    <div
      className={`${isHidden ? "hidden" : ""} fixed left-0 bottom-0 top-0 right-0 flex justify-center items-center z-10 pb-40`}
      style={{ background: "rgba(0,0,0,0.9)" }}
      onClick={() => toggleIsSetUpModalHidden()}
    >
      <div
        className={`w-1/4 h-1/2 rounded-xl px-8 flex flex-col justify-evenly relative`}
        style={{ background: "rgba(255,255,255,1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <AiOutlineClose size={24} className="absolute right-4 top-4 cursor-pointer" onClick={() => toggleIsSetUpModalHidden()} />

        <div className="">
          <h3 className="text-xl font-semibold">Setting up your project</h3>
          <p className="font-light text-sm mt-2">
            Select the branch to watch and the path where the swagger file is stocked in the repository
          </p>
        </div>

        <SetUpModalInput
          dispatch={dispatch}
          onChangeFieldName="branchName"
          label="Branch name"
          isValid={isBranchNameValid}
          isLoading={isBranchNameLoading}
        />
        <SetUpModalInput
          dispatch={dispatch}
          onChangeFieldName="filePath"
          label="File path"
          isValid={isFilePathValid}
          isLoading={isFilePathLoading}
        />
        <SetUpModalButton
          isFilePathValid={isFilePathValid}
          isBranchNameValid={isBranchNameValid}
          repository={repository}
          branchName={branchName}
          filePath={filePath}
        />
      </div>
    </div>
  );
};
