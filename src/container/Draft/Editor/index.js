/*
 * @Author: kevin
 * @Date:   2016-12-30 16:17:17
 * @Last Modified by:   kevin
 * @Last Modified time: 2017-01-14 23:31:26
 * @Description: 富文本编辑器
 */


'use strict';

import React from 'react';

import ReactDOM from 'react-dom';

import { AtomicBlockUtils, Editor, EditorState, RichUtils, Entity, convertFromHTML, ContentState, convertToRaw, convertFromRaw, CompositeDecorator, DefaultDraftBlockRenderMap, Modifier } from 'draft-js';

import './scss/editor.scss';

import { stateToHTML } from 'draft-js-export-html';

import Immutable from 'immutable';

import classNames from 'classnames';

import InlineStyleControls from './components/InlineStyleControls.js';

class MyEditor extends React.Component {

    constructor(props) {

        super(props);

        /**
         * 如果父级有值传递下来，就用传递的值，没有创建空置
         * @type {[type]}
         */
        const sampleMarkup = this.props.source;

        let initialData;

        if (!sampleMarkup) {
            initialData = EditorState.createEmpty()
        } else {
            initialData = EditorState.createWithContent(convertFromRaw(JSON.parse(sampleMarkup)))
        }

        this.state = {
            editorState: initialData
        }

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);

        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    }

    /**
     * 当有值传递下来的时候，使用props的值，用于编辑时
     */
    componentWillReceiveProps(nextProps) {


        if (this.props.source != nextProps.source) {
            this.setState({
                editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.source)))
            })
        }
    }

    /**
     * 返回Draft-js默认导出的JSON格式
     * @return {[type]} [description]
     */
    getState() {

        return JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));

    }

    /**
     * 从JSON转成的HTML元素
     */
    getHtml() {

        return stateToHTML(this.state.editorState.getCurrentContent());

    }

    _handleKeyCommand(command) {

        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;

    }

    _onTab(e) {

        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));

    }

    _toggleInlineStyle(inlineStyle) {

        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );

    }

    render() {

        const { editorState } = this.state;

        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">

                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />

                <div className={className} onClick={::this.focus}>
                    <Editor
                        editorState={editorState}
                        handleKeyCommand={::this.handleKeyCommand}
                        onChange={::this.onChange}
                        onTab={::this.onTab}
                        placeholder=""
                        ref="editor"
                        spellCheck={true}
                    />
                </div>

            </div>
        );

    }
}

export default MyEditor;
