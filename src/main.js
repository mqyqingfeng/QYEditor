/*
* @Author: kevin
* @Date:   2016-12-20 16:11:32
* @Last Modified by:   kevin
* @Last Modified time: 2017-01-14 22:33:23
* @Description: main.js 入口文件
*/

import { AppContainer } from 'react-hot-loader';

import React from 'react';

import ReactDOM from 'react-dom';

import Draft from 'CONTAINER/Draft';

const rootEl = document.getElementById('root');

ReactDOM.render(
    <AppContainer>
        <Draft />
    </AppContainer>,
    rootEl
);

if (module.hot) {

    module.hot.accept('CONTAINER/Draft', () => {

        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('CONTAINER/Draft').default;

        ReactDOM.render(
            <AppContainer>
                <NextApp />
            </AppContainer>,
            rootEl
        );

    });

}
