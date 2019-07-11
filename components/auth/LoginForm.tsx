import React from 'react';
import { Field, Formik } from 'formik';
import Link from 'next/link';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Yup from 'yup';

import CustomInput from '../CustomInput';
import CustomPasswordInput from '../CustomPasswordInput';
import ErrorAlert from '../ErrorAlert';
import { NextFunctionComponent } from 'next';
import { MutationFn } from 'react-apollo';
import { ApolloError } from 'apollo-client';

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    login: MutationFn;
    loading: boolean;
    error: ApolloError;
}

const userSignin = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required!'),
    password: Yup.string()
        .min(6)
        .required('Please, type your password!'),
});

const initialValues = {
    email: '',
    password: '',
};

const LoginForm: NextFunctionComponent<Props> = ({ login, loading, error }: Props) => (
    <Formik
        initialValues={initialValues}
        validationSchema={userSignin}
        onSubmit={(values, { setSubmitting }) => {
            login({
                variables: values,
            }).catch(() => setSubmitting(false));
        }}
        render={({ handleSubmit, isSubmitting }) => (
            <>
                <ErrorAlert error={error} />
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
                        {!isSubmitting || loading ? 'Log in' : 'Logging in'}
                    </Button>

                    <div className="text-center">
                        <p className="text-muted text-center">
                            Need an account?{' '}
                            <Link href="signup">
                                <a>Create your Schools account</a>
                            </Link>
                            .
                        </p>
                    </div>
                </Form>
            </>
        )}
    />
);

export default LoginForm;
