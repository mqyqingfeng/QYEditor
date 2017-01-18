/*
* @Author: kevin
* @Date:   2017-01-14 22:49:43
* @Last Modified by:   kevin
* @Last Modified time: 2017-01-14 23:24:21
* @Description: 加粗、斜体、下划线组件
*/


'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import StyleButton from './StyleButton.js';

/**
 * 加粗、斜体、下划线的配置
 * @type {Array}
 */
var INLINE_STYLES = [
    { label: '粗体', style: 'BOLD', icon: '&#xea55;' },
    { label: '斜体', style: 'ITALIC', icon: '&#xea5c;' },
    { label: '下划线', style: 'UNDERLINE', icon: '&#xea64;' },
];

/**
 * 第二行内联元素组件
 */
const InlineStyleControls = (props) => {

    var currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    icon={type.icon}
                />
            )}
        </div>
    );
};

export default InlineStyleControls;