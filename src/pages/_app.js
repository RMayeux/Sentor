import { Provider } from "next-auth/client";
import "@/styles/global.css";

const App = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
