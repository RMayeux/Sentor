import { AiOutlineWarning, AiOutlineCheckCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";

export const SetUpModalInput = ({ dispatch, onChangeFieldName, inputlabel, isValid, isLoading }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center relative">
        <label className="w-24">{inputlabel}</label>
        <input
          className="ml-4 p-2 pl-3 bg-gray-200 rounded-md outline-none flex-grow border border-gray-300"
          placeholder="main"
          required
          onChange={(e) =>
            dispatch({
              type: "FIELD",
              fieldName: onChangeFieldName,
              payload: e.currentTarget.value,
            })
          }
        />
        <div className={`w-6 ml-2`}>
          <AiOutlineWarning className={`${isValid !== null && !isValid && !isLoading ? "" : "hidden"}`} size={24} color="#EF4444" />
          <AiOutlineCheckCircle className={`${isValid && !isLoading ? "" : "hidden"}`} size={24} color="#10B981" />
          <BiLoaderAlt className={`animate-spin ${isLoading ? "" : "hidden"}`} size={24} />
        </div>
      </div>
    </div>
  );
};
