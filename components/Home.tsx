import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'reactstrap';
import Router from 'next/router';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
        }
    }
`;

const LOGOUT_MUTATION = gql`
    mutation LOGOUT_MUTATION {
        logout {
            message
        }
    }
`;

const Home = () => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>ERROR: {error.message}</p>;

            return (
                <>
                    <p>I am the current user id: {data.me.id}</p>
                    <Mutation mutation={LOGOUT_MUTATION}>
                        {logout => (
                            <Button
                                onClick={() => {
                                    logout();
                                    Router.push('/login');
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Mutation>
                </>
            );
        }}
    </Query>
);

export default Home;
