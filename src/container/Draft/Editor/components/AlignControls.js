/*
 * @Author: kevin
 * @Date:   2017-01-15 02:34:08
 * @Last Modified by:   kevin
 * @Last Modified time: 2017-01-15 02:43:37
 * @Description: file Description
 */

'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import StyleButton from './StyleButton.js';

import Immutable from 'immutable';

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
    'AlignLeft': {
        wrapper: <Align type='left'/>
    },
    'AlignCenter': {
        wrapper: <Align type='center'/>
    },
    'AlignRight': {
        wrapper: <Align type='right'/>
    }
});

export { blockRenderMap }

const ALIGN_TYPES = [
    { label: '居左', style: 'AlignLeft', icon: '&#xea53;' },
    { label: '居中', style: 'AlignCenter', icon: '&#xea51;' },
    { label: '居右', style: 'AlignRight', icon: '&#xea54;' }
];

const AlignControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {ALIGN_TYPES.map((type) =>
              <StyleButton
                key={type.label}
                active={type.style === blockType}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                icon={type.icon}
              />
            )}
          </div>
    );
};

export default AlignControls;
