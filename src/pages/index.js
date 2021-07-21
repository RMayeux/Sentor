import { ClientOnly } from "@/components/ClientOnly";
import { NavBar } from "@/components/NavBar";
import { RepositoryList } from "@/components/RepositoryList";
import { AiOutlineInfoCircle } from "react-icons/ai";
const IndexPage = ({ session }) => {
  return (
    <div>
      <NavBar session={session} />
      <ClientOnly className="ml-24 pl-6 bg-gray-300 flex flex-col align-center content-center flex-grow w-full">
        <h1 className=" m-6 text-3xl">Projects</h1>
        <div className="bg-white py-6 px-4 ml-4 rounded-md self-start flex justify-center border border-gray-400 align-center">
          <AiOutlineInfoCircle size={16} className="block m-auto" />
          <p className="ml-2">
            This is the list of repositories linked to your GitHub account, press &quot;Set up&quot; to start configurating your project
          </p>
        </div>
        <RepositoryList />
      </ClientOnly>
    </div>
  );
};

export default IndexPage;
