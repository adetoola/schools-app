import { NextFunctionComponent } from 'next';
import Router from 'next/router';
import NProgress from 'nprogress';
import React from 'react';

import Navigation from './Navigation';

Router.onRouteChangeStart = () => NProgress.start();

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const Header: NextFunctionComponent = () => <Navigation />;

export default Header;
