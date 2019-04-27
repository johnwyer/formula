import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

class FileUpload extends Component {
    state = {
        uploadedFiles: [],
        uploading: false
    };

    onDrop = (files) => {
        this.setState({
            uploading: true
        });

        let formData = new FormData();
        const config = {
            "header": { 'content-type':'multipart/form-data' }
        };
        formData.append("file", files[0]);
        axios.post('/api/users/upload-image', formData, config).then((response) => {
            console.log(response.data);
            this.setState({
                uploading: false,
                uploadedFiles: [
                    ...this.state.uploadedFiles,
                    response.data
                ]
            }, () => {
                this.props.imagesHandler(this.state.uploadedFiles, this.props.id);
            });
        });        
    };

    onRemove = (id) => {
        axios.get(`/api/users/remove-image?public_id=${id}`).then((response) => {
            let images = this.state.uploadedFiles.filter((item) => {
                return item.public_id !== id;
            });

            this.setState({
                uploadedFiles: images
            }, () => {
                this.props.imagesHandler(images, this.props.id);
            });
        });
    };

    showUploadedImages = () => (
        //console.log('showUploadedImages ', this.state.uploadedFiles);
        this.state.uploadedFiles.map((item)=>(
            <div className="dropzone_box" 
                key={item.public_id}
                onClick={ () => this.onRemove(item.public_id) }
            >
                <div className="wrap" style={{background:`url(${item.url}) no-repeat`}}></div>
            </div>
        ))
    );  

    updateUploadedImages = (images) => {
        this.setState({
            uploadedFiles: images
        });
    };

    static getDerivedStateFromProps(props, state) {
        if(props.reset){
            return state = {
                uploadedFiles: []
            };
        }

        return null;
    };

    render() {
        const { formdata } = this.props;
        return (
            <div>
                <section>
                    {
                        formdata.showLabel ? <label className="form-control-label">{formdata.config.label}</label> : null
                    }
                    <div className="dropzone clearfix">                    
                        <Dropzone
                            onDrop={(e)=>this.onDrop(e)}
                            multiple={false}
                            className="dropzone_box"
                        >
                            <div className="wrap">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </div>                        
                        </Dropzone>
                        { this.showUploadedImages() }
                        {
                            this.state.uploading ? 
                                <div className="dropzone_box" style={{textAlign:'center', paddingTop:'50px'}}>
                                    <CircularProgress />
                                </div>
                            : null
                        }
                    </div>
                </section>
            </div>
        )
    }
};

export default FileUpload;