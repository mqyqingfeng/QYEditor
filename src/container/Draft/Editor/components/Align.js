import React from 'react';

import ReactDOM from 'react-dom';

import Immutable from 'immutable';

// import { Immutable } from 'draft-js';


class Align extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'align-' + this.props.type}>
        		{/* here, this.props.children contains a <section> container, as that was the matching element */}
        		{this.props.children}
      		</div>
        );
    }
}


const blockRenderMap = Immutable.Map({
    'AlignCenter': {
        // element is used during paste or html conversion to auto match your component;
        // it is also retained as part of this.props.children and not stripped out
        wrapper: <Align type='center'/>
    },
    'AlignLeft': {
        // element is used during paste or html conversion to auto match your component;
        // it is also retained as part of this.props.children and not stripped out
        wrapper: <Align type='left'/>
    },
    'AlignRight': {
        // element is used during paste or html conversion to auto match your component;
        // it is also retained as part of this.props.children and not stripped out
        wrapper: <Align type='right'/>
    }
});

export { blockRenderMap }
