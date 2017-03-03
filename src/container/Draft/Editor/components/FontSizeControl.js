import React from 'react';

import ReactDOM from 'react-dom';

import classNames from 'classnames';

const fontSizeStyleMap = {
    FONTSIZE10: {
        fontSize: '10px'
    },
    FONTSIZE11: {
        fontSize: '11px'
    },
    FONTSIZE12: {
        fontSize: '12px'
    },
    FONTSIZE14: {
        fontSize: '14px'
    },
    FONTSIZE16: {
        fontSize: '16px'
    },
    FONTSIZE18: {
        fontSize: '18px'
    },
    FONTSIZE20: {
        fontSize: '20px'
    },
    FONTSIZE24: {
        fontSize: '24px'
    },
}

export { fontSizeStyleMap }

const FONTSIZE_TYPES = [
    { label: '10px', style: 'FONTSIZE10' },
    { label: '11px', style: 'FONTSIZE11' },
    { label: '12px', style: 'FONTSIZE12' },
    { label: '14px', style: 'FONTSIZE14' },
    { label: '16px', style: 'FONTSIZE16' },
    { label: '18px', style: 'FONTSIZE18' },
    { label: '20px', style: 'FONTSIZE20' },
    { label: '24px', style: 'FONTSIZE24' }
];

class FontSizeStyleControls extends React.Component {

    constructor() {

        super();
        this.state = {
            show: false,
            currentLabel: '16px'
        }

    }

    onChoose(style, label) {

        this.props.onToggle(style);
        this.setState({
            currentLabel: label
        })
        this.toggleFzList(false)
    }

    toggleFzList(boolean) {

        this.setState({
            show: boolean
        })

    }

    showFzList(e) {

        e.preventDefault();
        this.toggleFzList(!this.state.show);

    }

    render() {

        var btnClass = classNames({
            'fontSize-list': true,
            'hidden': !this.state.show
        });

        return (
            <div className="RichEditor-controls fontSize-controls" onMouseDown={::this.showFzList}>
                <span className="current-font-size">{this.state.currentLabel}<i className="editor-icon down-icon" dangerouslySetInnerHTML={{__html: '&#xe62c;'}}></i></span>
                <ul className={btnClass}>
                    {FONTSIZE_TYPES.map(type =>
                        <FontSizeItem
                            key={type.label}
                            label={type.label}
                            onChoose={::this.onChoose}
                            style={type.style}
                        />
                    )}
                </ul>
            </div>
        );
    }

};

export default FontSizeStyleControls;

class FontSizeItem extends React.Component {

    constructor() {
        super();
        this.onChoose = (e) => {
            e.preventDefault();
            this.props.onChoose(this.props.style, this.props.label);
        };
    }

    render() {

        let fzStyle = {
            fontSize: this.props.label
        }
        return (
            <li onMouseDown={this.onChoose} style={fzStyle}>
                {this.props.label}
            </li>
        );
    }
}