import { NextFunctionComponent } from 'next';
import NextHead from 'next/head';
import React from 'react';

import Favicon from './Favicon';

const defaultProps = {
    title: 'Ruby Schools',
    description: '',
    url: '',
    ogImage: '',
};

type Props = {
    title: string;
    description: string;
    url: string;
    ogImage: string;
} & typeof defaultProps;

const Meta: NextFunctionComponent<Props> = ({ title, description, url, ogImage }: Props) => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Favicon />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImage} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
    </NextHead>
);

Meta.defaultProps = defaultProps;
export default Meta;
