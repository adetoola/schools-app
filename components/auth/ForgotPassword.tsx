import { Field, Formik } from 'formik';
import { NextFunctionComponent } from 'next';
import Link from 'next/link';
import React from 'react';
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap';
import CustomInput from '../CustomInput';

const ForgotPassword: NextFunctionComponent = () => {
    return (
        <section
            className="space-sm d-flex justify-content-center align-items-center vh-100
        bg-auth bg-auth-img border-top border-top-2 border-primary"
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} xl={5} className="my-5">
                        <h1 className="display-4 text-center mb-4">Reset your password</h1>
                        <p className="lead text-muted text-center mb-4">
                            Enter a valid e-mail to receive instructions on how to reset your password.
                        </p>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                console.log(values);
                            }}
                            render={({ handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Field
                                            label="Email"
                                            name="email"
                                            type="email"
                                            component={CustomInput}
                                            placeholder="name@address.com"
                                            autoComplete="off"
                                        />
                                    </FormGroup>

                                    <Button className="mb-3" block color="primary" size="lg" type="submit">
                                        Sign in
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-muted text-center">
                                            Remember your password?{' '}
                                            <Link href="login">
                                                <a>Log in</a>
                                            </Link>
                                            .
                                        </p>
                                    </div>
                                </Form>
                            )}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ForgotPassword;
