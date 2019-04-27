import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import FileUpload from '../../../utils/Form/fileupload';
import { update, generateData, isFormValid, populateFields, populateOptionFields, resetFields } from '../../../utils/Form/formActions';
import { addTrack, getTrackById, updateTrack, getTrackCountries } from '../../../../actions/admin/track_actions';
//import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminAddEditTrack extends Component {
    state = {
        isEdit: false,
        formError: false,
        formSuccess: false,
        formdata: {
            officialName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Official Name',
                    name: 'officialName_input',
                    type: 'text',
                    placeholder: 'Team Official Name'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },          
            country: {
                element: 'select',
                value: '',
                config: {
                    label: 'Country',
                    name: 'country_input',
                    options: []
                },
                validation:{
                    required:true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },                                      
            firstFrandPrixEntry: {
                element: 'input',
                value: '',
                config: {
                    label: 'First Grand Prix',
                    name: 'firstFrandPrixEntry_input',
                    type: 'number',
                    placeholder: 'First Grand Prix'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            cirquitLength: {
                element: 'input',
                value: '',
                config: {
                    label: 'Circuit Length',
                    name: 'cirquitLength_input',
                    type: 'text',
                    placeholder: 'Circuit Length'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            numberOfLaps: {
                element: 'input',
                value: '',
                config: {
                    label: 'Number of laps',
                    name: 'numberOfLaps_input',
                    type: 'number',
                    placeholder: 'Number of laps'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            raceDistance: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race Distance',
                    name: 'raceDistance_input',
                    type: 'text',
                    placeholder: 'Race Distance'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            lapRecord: {
                element: 'input',
                value: '',
                config: {
                    label: 'Lap Record',
                    name: 'lapRecord_input',
                    type: 'text',
                    placeholder: 'Lap Record'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            lapRecordOwner: {
                element: 'input',
                value: '',
                config: {
                    label: 'Lap Record Owner',
                    name: 'lapRecordOwner_input',
                    type: 'text',
                    placeholder: 'Lap Record Owner'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },                                  
            trackConfiguration: {
                value: [],
                config: {
                    label: 'Track Configuration'
                },                
                validation: {
                    required:false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true                
            },
            trackImage: {
                value: [],
                config: {
                    label: 'Track Image'
                },                
                validation: {
                    required:false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true                
            }                     
        }
    };

    _breadcrumbsLinks = [{
        title: '< Back To Tracks',
        linkTo: '/admin/tracks'
    }];

    componentDidMount() {
        const trackId = this.props.match.params.id;
        if(trackId !== undefined){
            this.props.dispatch(getTrackById(trackId)).then((response) => {
                if (!this.props.track.tracks) {
                    this.props.history.push('/admin/tracks');
                } else {
                    const newFormdata = populateFields(this.state.formdata, this.props.track.tracks);   
                    const { trackConfiguration, trackImage } = this.props.track.tracks;
                    this.setState({
                        isEdit: true,
                        formdata: newFormdata
                    }, () => {
                        this.imagesHandler(trackConfiguration, 'trackConfiguration');
                        this.refs.trackConfigurationUploader.updateUploadedImages(trackConfiguration, 'trackConfiguration');
                        this.imagesHandler(trackImage, 'trackImage');
                        this.refs.trackImageUploader.updateUploadedImages(trackImage, 'trackImage');                        
                    });
                }
            });
        }

        const formdata = this.state.formdata;
        this.props.dispatch(getTrackCountries()).then((response) => {
            const newFormdata = populateOptionFields(formdata, this.props.track.countries, 'country');
            this.updateFields(newFormdata);
        });
    };

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add-edit-track');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'add-edit-track');

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.history.push('/admin/tracks');
            });
        }, 2000);
    };
    
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'add-edit-track');        
        let formIsValid = isFormValid(this.state.formdata, 'add-edit-track');
        
        if(this.props.match.params.id !== undefined){
            dataToSubmit.id = this.props.match.params.id;
            //dataToSubmit.dateOfBirth = moment(dataToSubmit.dateOfBirth, "MM/DD/YYYY");
        }        

        if (formIsValid) {
            //console.log(dataToSubmit);
            if (!this.state.isEdit) {
                this.props.dispatch(addTrack(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.track.addTrack.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            } else {
                this.props.dispatch(updateTrack(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.track.editTrack) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            }
        } else {
            this.setState({
                formError: true
            });
        }
    };

    imagesHandler = (images, field) => {
        console.log('imagesHandler ', images);
        const newFormdata = { ...this.state.formdata };
        newFormdata[field].value = images;
        newFormdata[field].valid = true;

        this.setState({
            formdata: newFormdata
        });
    };    

    render() {
        return (
            <UserLayout>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                <form onSubmit={(event) => this.submitForm(event)}>
                    <fieldset>
                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Track</Typography>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="trackConfigurationUploader"
                                    id={'trackConfiguration'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.trackConfiguration}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="trackImageUploader"
                                    id={'trackImage'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.trackImage}
                                />
                            </div>
                        </div>                        
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'officialName'}
                                    formdata={this.state.formdata.officialName}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div> 
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'firstFrandPrixEntry'}
                                    formdata={this.state.formdata.firstFrandPrixEntry}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>                         
                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id={'country'}
                                    formdata={this.state.formdata.country}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id={'cirquitLength'}
                                    formdata={this.state.formdata.cirquitLength}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id={'numberOfLaps'}
                                    formdata={this.state.formdata.numberOfLaps}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>                                                                      
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'raceDistance'}
                                    formdata={this.state.formdata.raceDistance}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'lapRecord'}
                                    formdata={this.state.formdata.lapRecord}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'lapRecordOwner'}
                                    formdata={this.state.formdata.lapRecordOwner}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div>
                        </div>         
                        {
                            this.state.formError ?
                                <div className="alert alert-dismissible alert-danger">Please check your data</div> 
                            : null
                        } 
                        {
                            this.state.formSuccess ?
                                <div className="alert alert-dismissible alert-success">Track successfully added to database</div> 
                            : null
                        }
                        <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>{this.state.isEdit ? 'Edit' : 'Add'} Track</button>
                    </fieldset> 
                </form> 
            </UserLayout>
        )
    }
}
                                                                                                                                        
const mapStateToProps = (state) => {
    return {
        track: state.track
    };
};

export default connect(mapStateToProps)(AdminAddEditTrack);