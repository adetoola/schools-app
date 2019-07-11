import { Field, Formik } from 'formik';
import Link from 'next/link';
import React from 'react';
import { Button, Form } from 'reactstrap';
import CustomInput from '../components/CustomInput';

const TestPage = () => (
    <Formik
        initialValues={{
            email: '',
            password: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
            console.log(values);
        }}
        render={({ handleSubmit, isSubmitting }) => (
            <Form className="mb-4 text-left col-lg-8" onSubmit={handleSubmit}>
                <Field name="email" type="email" component={CustomInput} placeholder="Your email address" />
                <Field
                    name="password"
                    type="password"
                    component={CustomInput}
                    placeholder="Choose a password"
                    text="At least seven characters with one numeral"
                />
                <small>
                    Forgot password?{' '}
                    <Link href="/forgot">
                        <a>Reset here</a>
                    </Link>
                </small>
                <div className="text-center mt-4">
                    <Button type="submit" color="success" size="lg">
                        Log in
                    </Button>
                </div>
            </Form>
        )}
    />
);

export default TestPage;
