/*
* @Author: kevin
* @Date:   2016-12-20 16:19:30
* @Last Modified by:   kevin
* @Last Modified time: 2017-01-14 23:33:58
* @Description: Redux的包裹组件和React-router的使用
*/

import React from 'react';

import ReactDOM from 'react-dom';

import Editor from './Editor';

class Draft extends React.Component {

	constructor() {

	    super();

	    this.state = {
	        html: null
	    };

	}

	getRichEditorHtml() {

	    console.log(JSON.parse(this.refs.editor.getState()))
	    console.log(this.refs.editor.getHtml())

	}

    render() {
        return (
        	<div>
        		<button style={{'marginBottom': '20px'}} onClick={::this.getRichEditorHtml}>点击console当前的state和产生的HTMl</button>
        		<Editor ref="editor" source={this.state.html} />
        	</div>

        );
    }
}

export default Draft;
