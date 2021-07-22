import { Provider } from "next-auth/client";
import "@/styles/global.css";
import { getSession } from "next-auth/client";
import App from "next/app";
import client from "../../apollo-client";
import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer />
      </ApolloProvider>
    </Provider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  const session = await getSession(ctx);

  // REDIRECT TO LOGIN IS NOT LOGGED IN
  if (!session && ctx.asPath !== "/login") {
    ctx.res.writeHead(307, { Location: "/login" });
    ctx.res.end();
    return;
  }

  // REDIRECT TO HOMEPAGE IS LOGGED IN
  if (session && ctx.asPath === "/login") {
    ctx.res.writeHead(307, { Location: "/" });
    ctx.res.end();
    return;
  }

  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps.session = session;
  return appProps;
};

export default MyApp;
