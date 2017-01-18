/*
* @Author: kevin
* @Date:   2017-01-14 22:45:57
* @Last Modified by:   kevin
* @Last Modified time: 2017-01-14 22:47:48
* @Description: 按钮组件
*/


'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

class StyleButton extends React.Component {

    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {

        let className = 'RichEditor-styleButton';

        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        let icon = this.props.icon ? <i className="editor-icon" dangerouslySetInnerHTML={{__html: this.props.icon}}></i> : this.props.label

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {icon}
            </span>
        );
    }
}

export default StyleButton;