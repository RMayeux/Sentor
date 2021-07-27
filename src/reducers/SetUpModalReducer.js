export function SetUpModalReducer(state, action) {
  switch (action.type) {
    case "FIELD":
      return {
        ...state,
        [action.fieldName]: action.payload,
      };

    case "BRANCHES_INIT":
      return {
        ...state,
        branches: action.data.branches,
      };

    case "BRANCH_NAME_DEPENDENCIES_INVALID":
      return {
        ...state,
        isBranchNameValid: null,
        isBranchNameLoading: false,
      };

    case "BRANCH_NAME_CHECK_IN_PROGRESS":
      return {
        ...state,
        isBranchNameLoading: true,
      };

    case "BRANCH_NAME_CHECK":
      return {
        ...state,
        isBranchNameValid: state.branches?.find((branch) => branch.name === state.branchName),
        isBranchNameLoading: false,
      };

    case "FILE_PATH_DEPENDENCIES_INVALID":
      return {
        ...state,
        isFilePathValid: null,
      };

    case "FILE_PATH_CHECK_IN_PROGRESS":
      return {
        ...state,
        isFilePathLoading: true,
      };

    case "FILE_PATH_CHECK":
      return {
        ...state,
        isFilePathValid: action.data ? true : false,
        isFilePathLoading: false,
      };
    default:
      return state;
  }
}

export const SetUpModalInitialState = {
  branchName: "",
  isBranchNameValid: null,
  isBranchNameLoading: false,
  filePath: "",
  isFilePathValid: null,
  isFilePathLoading: false,
  branches: null,
};
