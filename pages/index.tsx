import { NextFunctionComponent } from 'next';
import React from 'react';

import Meta from '../components/Meta';
import HomeComp from '../components/Home';

const Home: NextFunctionComponent = () => (
    <div>
        <Meta />
        <HomeComp />
    </div>
);

export default Home;
