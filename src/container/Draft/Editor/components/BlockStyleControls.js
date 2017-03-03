import React from 'react';

import ReactDOM from 'react-dom';

import StyleButton from './StyleButton.js';

const BLOCK_TYPES = [
    { label: '引用', style: 'blockquote', icon: '&#xea5f;' },
    { label: '无序列表', style: 'unordered-list-item', icon: '&#xea5e;' },
    { label: '有序列表', style: 'ordered-list-item', icon: '&#xea60;' },
    { label: '代码', style: 'code-block', icon: '&#xe65f;' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
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

export default BlockStyleControls;

/**
 * 通过添加类名的方式，为特定的块元素添加样式
 */
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

export { getBlockStyle }