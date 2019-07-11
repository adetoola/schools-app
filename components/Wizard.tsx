/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Button, Row, Col } from 'reactstrap';
import { Debug } from './Debug';
import * as Yup from 'yup';

const createSchoolSchema = Yup.object().shape({
    schoolName: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!')
        .required('School name is required!'),
    location: Yup.string().required('School location is required'),
});

interface Values {
    schoolName: string;
    location: string;
    timezone: string;
    weekStarts: string;
    dateFormat: string;
    timeFormat: string;
}

interface Props {
    initialValues: Values;
    onSubmit(values: Values, actions: any): void;
    children: React.ReactElement<PageProps>[];
}

interface State {
    page: number;
    values: Values;
}

interface PageProps {
    validate?(values: Values): any;
}

class Page extends React.Component<PageProps> {
    render() {
        return this.props.children;
    }
}

export default class Wizard extends Component<Props, State> {
    static Page = ({ children, parentState }) => {
        return children(parentState);
    };

    state: State = {
        page: 0,
        values: this.props.initialValues,
    };

    next = values =>
        this.setState(state => ({
            page: Math.min(state.page + 1, this.props.children.length - 1),
            values,
        }));

    previous = () =>
        this.setState(state => ({
            page: Math.max(state.page - 1, 0),
        }));

    validate = values => {
        const activePage: Page = React.Children.toArray(this.props.children)[this.state.page] as any;
        return activePage.props.validate ? activePage.props.validate(values) : {};
    };

    handleSubmit = (values, bag) => {
        const { children, onSubmit } = this.props;
        const { page } = this.state;
        const isLastPage = page === React.Children.count(children) - 1;
        if (isLastPage) {
            return onSubmit(values, bag);
        } else {
            this.next(values);
            bag.setSubmitting(false);
        }
    };

    render() {
        const { children } = this.props;
        const { page, values } = this.state;
        const activePage = React.Children.toArray(children)[page];
        const isLastPage = page === React.Children.count(children) - 1;
        return (
            <Formik
                initialValues={values}
                enableReinitialize={false}
                validate={this.validate}
                validationSchema={createSchoolSchema}
                onSubmit={this.handleSubmit}
                render={props => (
                    <section className="space-sm d-flex justify-content-center vh-100          bg-auth bg-auth-img border-top border-top-2 border-primary">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-8 col-xl-7">
                                    <div className="header mt-md-5">
                                        <div className="col-12">
                                            <img
                                                alt="Our Logo"
                                                className="img-fluid mx-auto d-block"
                                                src="./static/favicon/apple-icon-76x76.png"
                                            />
                                        </div>
                                        <div className="header-body">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h1 className="header-title text-center mb-4">
                                                        {page === 0
                                                            ? "Let's create your first school"
                                                            : 'Choose your settings'}
                                                    </h1>
                                                    <span className="lead">
                                                        {page === 0
                                                            ? 'Everything in Ruby Schools lives in a school. You will be able to create more schools later on.'
                                                            : "We've picked some default settings but you can change them to suit how you like to see certain things. You'll be able to change these later on."}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Form onSubmit={props.handleSubmit}>
                                        {React.cloneElement(activePage as any, { parentState: { ...props } })}
                                        <Row className="mb-3 mt-5 justify-content-between">
                                            <Col xs="auto">
                                                {page > 0 && (
                                                    <Button
                                                        className="mb-3"
                                                        color="light"
                                                        type="button"
                                                        onClick={this.previous}
                                                    >
                                                        Previous
                                                    </Button>
                                                )}
                                            </Col>
                                            <Col xs="auto">
                                                {!isLastPage && (
                                                    <Button className="mb-3" color="primary" type="submit">
                                                        Create school
                                                    </Button>
                                                )}
                                                {isLastPage && (
                                                    <Button
                                                        className="mb-3 float-right"
                                                        color="primary"
                                                        type="submit"
                                                        disabled={props.isSubmitting}
                                                    >
                                                        Let&lsquo;s go
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Debug />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            />
        );
    }
}
