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
