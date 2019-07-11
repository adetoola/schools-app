import gql from 'graphql-tag';
import { NextFunctionComponent } from 'next';
import { Mutation, MutationFn, MutationResult } from 'react-apollo';

import LoadingState from './LoadingState';
import VerifyEmailError from './VerifyEmailError';

const VERIFY_EMAIL_MUTATION = gql`
    mutation VERIFY_EMAIL_MUTATION($token: String!) {
        verify(token: $token) {
            ok
        }
    }
`;

interface Props {
    token: string;
}

const VerifyEmail: NextFunctionComponent<Props> = ({ token }: Props) => (
    <Mutation mutation={VERIFY_EMAIL_MUTATION} variables={{ token }}>
        {(verify: MutationFn, { loading, error, called }: MutationResult) => {
            if (!called) verify();
            if (loading) return <LoadingState text="Verifying your email please wait." />;
            if (error) return <VerifyEmailError error={error} />;
            return (
                <section
                    className="bg-dark d-flex vh-100 justify-content-center align-items-center"
                    style={{ backgroundImage: 'url(/static/img/patterns/pattern-1.svg)' }}
                >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 col-lg-8 text-center">
                                <p className="text-white mb-3">Icon here</p>
                                <h1 className="display-4 text-white">Email Verified.</h1>

                                <p className="font-size-lg text-muted my-4 my-md-6">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, minus illum eaque quod
                                    quaerat repellendus eos dicta cumque voluptates! Nulla saepe sunt vitae! Velit
                                    ipsam, cupiditate ipsa neque officiis autem.
                                </p>

                                <a href="#!" className="btn btn-primary-desat lift">
                                    Check it out <i className="fe fe-arrow-right ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }}
    </Mutation>
);

export default VerifyEmail;
