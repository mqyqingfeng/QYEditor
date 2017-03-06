import React from 'react';

import ReactDOM from 'react-dom';

import { AtomicBlockUtils, Editor, EditorState, RichUtils, Entity, convertFromHTML, ContentState, convertToRaw, convertFromRaw, CompositeDecorator, DefaultDraftBlockRenderMap, Modifier } from 'draft-js';

import './scss/editor.scss';

import { stateToHTML } from 'draft-js-export-html';

import Immutable from 'immutable';

import classNames from 'classnames';

import InlineStyleControls from './components/InlineStyleControls.js';

import FontSizeStyleControl, { fontSizeStyleMap } from './components/FontSizeControl.js';

import BlockStyleControls, { getBlockStyle } from './components/BlockStyleControls.js';

import AlignControls, { blockRenderMap } from './components/AlignControls.js';

import DividerStyleControl, { dividerBlockRenderer } from './components/Divider.js';

import FontColorStyleControls, {COLOR, BGCOLOR} from './components/FontColorControl.js';


const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

let choosedColor = {};
let choosedBgColor = {};
let changeColorSelection = null;

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
            editorState: initialData,
            customStyleMap: fontSizeStyleMap,
            currentColor: '#999',
            currentBgColor: '#999'
        }

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });
        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);

        this.toggleBlockType = (type) => this._toggleBlockType(type);

        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

        this.changeFontSizeStyle = this.changeFontSizeStyle.bind(this);

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

    /**
     * 改变内联样式包括加粗、斜体、下划线
     * @param  {String} inlineStyle 内联样式
     */
    _toggleInlineStyle(inlineStyle) {

        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );

    }

    _toggleBlockType(blockType) {

        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );

    }

    createDivider(e) {
        e.preventDefault();

        const entityKey = Entity.create(
            'Divider',
            'IMMUTABLE'
        );

        let neweditorState = AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey, ' ');

        this.setState({
            editorState: neweditorState,
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }

    /**
     * 处理文字颜色和背景色的改变
     * @param  {String} color 文字的色值
     * @param  {String} type  背景色的色值
     */
    handleChangeColor(color, type) {

        // 储存选择过的颜色，是为了在去除掉以前的样式中用
        let addNewStyleMap = null;

        if (type == COLOR) {

            this.setState({
                currentColor: color
            })

            addNewStyleMap = {
                [color]: {
                    color: color,
                }
            }

            if (!choosedColor[color]) {

               choosedColor = {...choosedColor, ...addNewStyleMap}

            }

        }
        else if(type == BGCOLOR){

            this.setState({
                currentBgColor: color
            })

            addNewStyleMap = {
                ['bg-' + color]: {
                    backgroundColor: color
                }
            }

            if (!choosedBgColor['bg-' + color]) {

               choosedBgColor = {...choosedBgColor, ...addNewStyleMap}
            }
        }

        this.setState((prevState) => ({
            customStyleMap: Object.assign({}, prevState.customStyleMap, addNewStyleMap)
        }), () => {
            this.changeColor(color, type);
        });

    }

    /**
     * 改变字体颜色和背景色
     * @param  {String} color 色值
     * @param  {String} type  设置的类型
     */
    changeColor(color, type) {

        const { editorState } = this.state;

        // 因为输入色值时会导致失焦，所以需要保存输入之前的选区，然后在这里重新选中。
        let editorStatewithSelection = EditorState.forceSelection(
            editorState,
            changeColorSelection
        )

        const selection = editorStatewithSelection.getSelection();

        // 清除之前的样式
        let reduceColor = type == COLOR && choosedColor || type == BGCOLOR && choosedBgColor;

        const nextContentState = Object.keys(reduceColor)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color);
            }, editorState.getCurrentContent());

        // 由nextContentState产生新的editorState
        let nextEditorState = EditorState.push(
                editorState,
                nextContentState,
                type == COLOR && 'change-fontColor' || type == BGCOLOR && 'change-fontBgColor'
            );

        this.onChange(
            RichUtils.toggleInlineStyle(
                nextEditorState,
                type == COLOR && color || type == BGCOLOR && 'bg-' + color
            )
        );

        // 重置储存的selection
        changeColorSelection = null;

    }

    test(e) {

        e.preventDefault();

        let addNewStyleMap = {
            red: {
                color: 'rgba(255, 0, 0, 1.0)',
            },
        }
        this.setState({
            customStyleMap: Object.assign({}, fontSizeStyleMap, addNewStyleMap)
        }, () => {
            this.onChange(
                RichUtils.toggleInlineStyle(
                    this.state.editorState,
                    'red'
                )
            );
        });

    }

    /**
     * 改变字体大小
     * @param  {String} inlineStyle 字体大小样式
     */
    changeFontSizeStyle(inlineStyle) {

        const { editorState } = this.state;
        const selection = editorState.getSelection();

        // 清除之前的样式
        const nextContentState = Object.keys(fontSizeStyleMap)
            .reduce((contentState, fontSize) => {
                return Modifier.removeInlineStyle(contentState, selection, fontSize);
            }, editorState.getCurrentContent());

        // 由nextContentState产生新的editorState
        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-fontSize'
        );

        this.onChange(
            RichUtils.toggleInlineStyle(
                nextEditorState,
                inlineStyle
            )
        );

    }

    /**
     * 储存当前的selection
     */
    saveCurrentSelection() {

        changeColorSelection = this.state.editorState.getSelection()

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
                <div className="styleControl clearfix">
                    <FontSizeStyleControl
                        editorState={editorState}
                        onToggle={this.changeFontSizeStyle}
                    />

                    <BlockStyleControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />

                    <AlignControls
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                    />

                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />

                    <DividerStyleControl onToggle={::this.createDivider} />

                    <FontColorStyleControls
                        editorState={editorState}
                        onToggle={::this.handleChangeColor}
                        currentColor={this.state.currentColor}
                        currentBgColor={this.state.currentBgColor}
                        saveCurrentSelection={::this.saveCurrentSelection}
                    />
                    <strong onMouseDown={::this.test}>测试</strong>
                </div>
                <div className={className} onClick={::this.focus}>
                    <Editor
                        blockRendererFn={dividerBlockRenderer}
                        customStyleMap={this.state.customStyleMap}
                        blockStyleFn={getBlockStyle}
                        blockRenderMap={extendedBlockRenderMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        onTab={this.onTab}
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
