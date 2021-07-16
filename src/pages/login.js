import { signIn } from "next-auth/client";

const LoginPage = () => {
  return (
    <div>
      You are not logged in! <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default LoginPage;
