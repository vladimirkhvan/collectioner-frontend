import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://localhost:8800/graphql',
    cache: new InMemoryCache(),
});