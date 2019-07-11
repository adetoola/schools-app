import React from 'react';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Yup from 'yup';

import CustomInput from '../CustomInput';
import CustomPasswordInput from '../CustomPasswordInput';
import ErrorAlert from '../ErrorAlert';
import { NextFunctionComponent } from 'next';
import { ApolloError } from 'apollo-client';
import { MutationFn } from 'react-apollo';

interface Props {
    signup: MutationFn;
    loading: boolean;
    error: ApolloError;
}

const userRegistration = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    password: Yup.string()
        .min(6)
        .required('Please, pick a password!'),
    confirmPassword: Yup.string()
        .min(6)
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm: NextFunctionComponent<Props> = ({ signup, loading, error }: Props) => (
    <>
        <ErrorAlert error={error} />
        <Formik
            initialValues={initialValues}
            validationSchema={userRegistration}
            onSubmit={(values, { setSubmitting }) => {
                signup({
                    variables: values,
                }).catch(() => setSubmitting(false));
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

                    <FormGroup>
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            component={CustomPasswordInput}
                            placeholder="Enter your password"
                            autoComplete="off"
                            hasLink={false}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            component={CustomPasswordInput}
                            placeholder="Re-enter your password"
                            autoComplete="off"
                            hasLink={false}
                        />
                    </FormGroup>
                    <Button
                        className="mb-3"
                        block
                        color="primary"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting || loading}
                    >
                        {isSubmitting || loading ? 'Creating your account' : 'Create your account'}
                    </Button>

                    <div className="text-center">
                        <p className="text-muted text-center">
                            By creating an account you agree to our{' '}
                            <Link href="terms">
                                <a>Terms of Service</a>
                            </Link>{' '}
                            and{' '}
                            <Link href="privacy">
                                <a>Privacy Policy.</a>
                            </Link>
                        </p>
                    </div>
                </Form>
            )}
        />
    </>
);

export default SignUpForm;
