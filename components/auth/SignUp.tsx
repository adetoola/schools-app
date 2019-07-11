import React from 'react';
import gql from 'graphql-tag';
import { NextFunctionComponent } from 'next';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';
import { Col, Container, Row } from 'reactstrap';

import SignUpForm from './SignUpForm';
import VerifyEmail from './VerifyEmail';

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
            id
            email
        }
    }
`;

const SignUp: NextFunctionComponent = () => (
    <Mutation mutation={SIGNUP_MUTATION}>
        {(signup: MutationFn, { data, error, called, loading }: MutationResult) =>
            !loading && !error && called ? (
                <VerifyEmail email={data.signup.email} />
            ) : (
                <section
                    className="space-sm d-flex justify-content-center align-items-center vh-100
      bg-auth bg-auth-img border-top border-top-2 border-primary"
                >
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={6} xl={5} className="my-5">
                                <h1 className="display-4 text-center mb-4">Create your account</h1>
                                <p className="lead text-muted text-center mb-4">
                                    Create an account to discuss, publish, and manage all of your projects.
                                </p>
                                <SignUpForm signup={signup} loading={loading} error={error} />
                            </Col>
                        </Row>
                    </Container>
                </section>
            )
        }
    </Mutation>
);

export default SignUp;
