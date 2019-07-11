import { Field, Formik } from 'formik';
import { NextFunctionComponent } from 'next';
import React from 'react';
import { Button, Container, Form, FormGroup, Row } from 'reactstrap';
import CustomInput from '../CustomInput';

const ForgotUsername: NextFunctionComponent = () => {
    return (
        <section
            className="space-sm d-flex justify-content-center align-items-center vh-100
      bg-auth bg-auth-img border-top border-top-2 border-primary"
        >
            <Container>
                <Row className="justify-content-center">
                    <div className="col-12 col-md-6 col-xl-5 my-5">
                        <h1 className="display-4 text-center mb-4">Forgot your username?</h1>
                        <p className="lead text-muted text-center mb-4">
                            Enter a valid e-mail and if that e-mail is associated with an account you own, you'll get an
                            e-mail with the username.
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
                                        Get your username
                                    </Button>
                                </Form>
                            )}
                        />
                    </div>
                </Row>
            </Container>
        </section>
    );
};

export default ForgotUsername;
