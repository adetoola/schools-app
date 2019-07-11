import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import Page from '../components/Page';
import { isMobile } from '../lib/isMobile';
import withApollo from '../lib/withApollo';

interface Props {
    Component: any;
    apollo: any;
    pageProps: any;
}

class MyApp extends App<Props, { isMobile: boolean }> {
    public static async getInitialProps({ Component, ctx }) {
        const pageProps = { isMobile: isMobile({ req: ctx.req }) };

        if (Component.getInitialProps) {
            Object.assign(pageProps, await Component.getInitialProps(ctx));
        }
        // this exposes the query to the user
        // pageProps.query = ctx.query;
        return { pageProps };
    }

    public props: Props;

    public render() {
        const { Component, apollo, pageProps }: Props = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Page>
                        <Component {...pageProps} />
                    </Page>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApollo(MyApp);
