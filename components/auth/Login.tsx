import { NextFunctionComponent } from 'next';
import Router from 'next/router';
import gql from 'graphql-tag';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import LoginForm from './LoginForm';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
        }
    }
`;

const Login: NextFunctionComponent = () => {
    return (
        <section
            className="space-sm d-flex justify-content-center align-items-center vh-100
      bg-auth bg-auth-img border-top border-top-2 border-primary"
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} xl={5} className="col-12 col-md-6 col-xl-5 my-5">
                        <h1 className="display-4 text-center mb-4">Welcome back!</h1>
                        <p className="lead text-muted text-center mb-4">
                            Log in to access your profile, settings, published projects and Snacks
                        </p>
                        <Mutation mutation={LOGIN_MUTATION}>
                            {(login: MutationFn, { error, called, loading }: MutationResult) =>
                                !loading && !error && called ? (
                                    Router.push('/')
                                ) : (
                                    <LoginForm login={login} loading={loading} error={error} />
                                )
                            }
                        </Mutation>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default Login;
