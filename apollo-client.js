// ./apollo-client.js

import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { toast } from "react-toastify";

const errorLink = onError(({ graphQLErrors }) => {
  console.log({ graphQLErrors });

  if (graphQLErrors)
    graphQLErrors.map(({ message }) => {
      toast.error(message);
      console.log(message);
    });
});

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
