import { ClientOnly } from "@/components/ClientOnly";
import { Repositories } from "@/components/Repositories";
import { signOut } from "next-auth/client";

const IndexPage = ({ session }) => {
  return (
    <div>
      <ClientOnly>
        <Repositories />
      </ClientOnly>
      Hello, {session.user.email ?? session.user.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default IndexPage;
