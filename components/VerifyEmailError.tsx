import React from 'react';
import { ApolloError } from 'apollo-client';
import { NextFunctionComponent } from 'next';
import { XCircle } from 'react-feather';

interface Props {
    error: ApolloError;
}

const VerifyEmailError: NextFunctionComponent<Props> = ({ error }: Props) => {
    const formatError = (error: ApolloError): string => {
        return error.message.replace('GraphQL error: ', '');
    };

    return (
        <section
            className="bg-dark d-flex vh-100 justify-content-center align-items-center"
            style={{ backgroundImage: 'url(/static/img/patterns/pattern-1.svg)' }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 text-center">
                        <p className="text-white badge badge-pill badge-gray-700-soft mb-3">
                            <XCircle size={144} />
                        </p>
                        <h1 className="display-4 text-white">An error occurred.</h1>

                        <p className="font-size-lg text-muted my-4 my-md-6">{formatError(error)}</p>

                        <a href="#!" className="btn btn-primary-desat lift">
                            Check it out <i className="fe fe-arrow-right ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VerifyEmailError;
