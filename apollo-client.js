// ./apollo-client.js

import { ApolloClient, InMemoryCache, createHttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
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
