import React, { Component } from 'react';

class PictureUpload extends Component {
    render() {
        return (<div className="picture-upload">
            <p> Add an Image: </p>
                <input type="file" onChange={this.uploadPhoto} />
            <p>
                <button>Finish</button>
            </p>
        </div>
        )
    }
}

export default PictureUpload;
