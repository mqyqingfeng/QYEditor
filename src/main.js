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
