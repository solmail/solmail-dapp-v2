import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getToken } from "@utils/index";
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_SOLMAIL_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
