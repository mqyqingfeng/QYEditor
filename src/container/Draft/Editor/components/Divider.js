import React from 'react';

import ReactDOM from 'react-dom';

import { Entity } from 'draft-js';

function dividerBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: DividerComponent,
            editable: false,
        };
    }

    return null;
}

export { dividerBlockRenderer }

const DividerComponent = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'HR') {
        media = <Divider />;
    }

    return media;
};


class Divider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="hr">
      		</div>
        );
    }
}

class DividerStyleControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <i className="editor-icon divider-icon" onMouseDown={this.props.onToggle} dangerouslySetInnerHTML={{__html: '&#xe619;'}}></i>
        );
    }
}

export default DividerStyleControl;