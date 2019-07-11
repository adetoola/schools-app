import { NextFunctionComponent } from 'next';
import React from 'react';
import '../scss/app.scss';
import Meta from './Meta';

interface Props {
    children: any;
}

const Page: NextFunctionComponent<Props> = ({ children }) => (
    <>
        <Meta />
        {children}
    </>
);

export default Page;
