import React from 'react';

import ReactDOM from 'react-dom';

import classNames from 'classnames';


const basicStyleMap = [
	'#ffffff','#f8d9d6','#fadbaf','#fffed8','#dcf94f','#99f8d8','#acc8fa','#f3b0d3','#ef87a8',
	'#d6d6d6','#f4b0ad','#f4bc99','#fefc52','#96f688','#73f8fd','#84abf8','#c859a5','#ed5e7a',
	'#b2b2b2','#d0adab','#ee733a','#f9db69','#60cd3e','#60d1fb','#367ef7','#9e43f6','#eb4547',
	'#888888','#734744','#ec5c28','#f3ad3d','#5ca450','#5ea7d2','#1e52f6','#7451cf','#c73945',
	'#000000','#711b0a','#eb5c4b','#cfaa52','#4d751f','#3478a5','#071ea2','#787ba6','#9d2b42'
]

// 将传递的类型值设置成常量
const COLOR = 'color';
const BGCOLOR = 'bgcolor';

export {COLOR, BGCOLOR}

class FontColorStyleControls extends React.Component {

    constructor() {

        super();
        this.state = {
            show: false,
            colorValue: '#000000'
        }

    }

    onChoose(color) {

        this.props.onToggle(color, this.state.showType);

        this.toggleFontColorList(false)
    }

    toggleFontColorList(boolean) {

        this.setState({
            show: boolean
        })

    }

    showFontColorList = (type) => (e) => {

        e.preventDefault();

        this.setState({
        	showType: type
        })

        this.props.saveCurrentSelection();

        this.toggleFontColorList(!this.state.show);

    }

    confirmColor() {

    	this.onChoose(this.state.colorValue)

    }

    handleInputColor(e) {

    	this.setState({
    		colorValue: e.target.value
    	})

    }

    render() {

        var btnClass = classNames({
            'font-color-wrap': true,
            'hidden': !this.state.show
        });

        return (
            <div className="RichEditor-controls font-color-controls">
                <span className="font-color-control-btn" onMouseDown={this.showFontColorList(COLOR)}>
                	<i className="editor-icon" dangerouslySetInnerHTML={{__html: '&#xea59;'}} style={{color: this.props.currentColor}}></i>
                	<i className="editor-icon down-icon" dangerouslySetInnerHTML={{__html: '&#xe62c;'}}></i>
                </span>
                <span className="font-color-control-btn" onMouseDown={this.showFontColorList(BGCOLOR)}>
                	<i className="editor-icon" dangerouslySetInnerHTML={{__html: '&#xe643;'}} style={{color: this.props.currentBgColor}}></i>
                	<i className="editor-icon down-icon" dangerouslySetInnerHTML={{__html: '&#xe62c;'}}></i>
                </span>
                <div className={btnClass}>
                	<p>基本色</p>
                	<ul id="font-color-list" className="clearfix">
                	    {basicStyleMap.map((color, index) =>
                	        <FontColorItem
                	            key={index}
                	            color={color}
                	            onChoose={::this.onChoose}
                	        />
                	    )}
                	</ul>
                	<span className="colorBlock" style={{backgroundColor: this.state.colorValue}}></span>
                	<input
                		type="text"
                		className="color-input"
                		placeholder="#000000"
                		onChange={::this.handleInputColor}
                	/>
                	<div className="color-confirm-btn" onClick={::this.confirmColor}>确认</div>

                </div>

            </div>
        );
    }

};

export default FontColorStyleControls;

class FontColorItem extends React.Component {

    constructor() {

        super();

        this.onChoose = (e) => {

            e.preventDefault();
            this.props.onChoose(this.props.color);

        };

    }

    render() {

        let bgColorStyle = {
            backgroundColor: this.props.color
        }

        return (
            <li onMouseDown={this.onChoose} style={bgColorStyle} className="colorBlock">
            </li>
        );
    }
}

