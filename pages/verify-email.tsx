import React from 'react';
import VerifyEmail from '../components/VerifyEmail';
import redirect from '../lib/redirect';

interface Props {
    apolloClient: any;
    query: {
        token: string;
    };
}

const VerifyEmailPage = ({ query: { token } }: Props) => <VerifyEmail token={token} />;

VerifyEmailPage.getInitialProps = ctx => {
    const { query } = ctx;
    if (!query.token) {
        redirect(ctx, '/login');
    }
    return { query };
};

export default VerifyEmailPage;
