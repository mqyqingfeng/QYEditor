import React from 'react';

import ReactDOM from 'react-dom';

import { Entity } from 'draft-js';

const styles = {
    media: {
        display: 'block',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
}

function dividerAndMediaBlockRenderer(block) {
    if (block.getType() === 'atomic') {
        return {
            component: DividerAndMediaComponent,
            editable: false,
        };
    }

    return null;
}

export { dividerAndMediaBlockRenderer }

const DividerAndMediaComponent = (props) => {
    const entity = Entity.get(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === 'Divider') {
        media = <Divider />;
    } else if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image') {
        media = <Image src={src} />;
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};

const Divider = (props) => {
    return (
        <div className="hr"></div>
    );
};

class DividerAndMediaStyleControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="RichEditor-controls">
                <i className="editor-icon divider-icon" onMouseDown={this.props.onCreateDivider}>&#xe619;</i>
                <i className="editor-icon media-icon" onClick={this.props.onHandleMidia('image')}>&#xea69;</i>
                <i className="editor-icon media-icon" onClick={this.props.onHandleMidia('audio')}>&#xe605;</i>
                <i className="editor-icon media-icon" onClick={this.props.onHandleMidia('video')}>&#xe608;</i>
            </div>
        );
    }
}

export default DividerAndMediaStyleControl;
