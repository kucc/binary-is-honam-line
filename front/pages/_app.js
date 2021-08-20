import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const App = ({ Component }) => (
        <>  
            <Head>
                <meta charset="utf-8" />
                <title>KUCC HOMEPAGE</title>
            </Head>
            <Component />  
        </>
);

App.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
