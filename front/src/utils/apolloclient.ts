import { ApolloClient, InMemoryCache } from "@apollo/client";

export const clientCSR = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export const getClientSSR = () =>
  new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
  });
