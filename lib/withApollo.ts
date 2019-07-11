/* eslint-disable no-console */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import withApollo from 'next-with-apollo';

import { endpoint, prodEndpoint } from './config';

export default withApollo(
    ({ ctx, headers, initialState }) =>
        new ApolloClient({
            link: ApolloLink.from([
                onError(({ graphQLErrors, networkError }) => {
                    if (graphQLErrors)
                        graphQLErrors.map(({ message, locations, path }) =>
                            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
                        );
                    if (networkError) console.log(`[Network error]: ${networkError}`);
                }),
                new HttpLink({
                    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
                    credentials: 'same-origin',
                }),
            ]),
            cache: new InMemoryCache().restore(initialState || {}),
        })
);
