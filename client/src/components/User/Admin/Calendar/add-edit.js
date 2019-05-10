import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import FileUpload from '../../../utils/Form/fileupload';
import { update, generateData, isFormValid, populateFields, resetFields, populateOptionFields } from '../../../utils/Form/formActions';
import { addRace, getRaceById, updateRace, getRaceCountries, getRaceTracks } from '../../../../actions/admin/calendar_actions';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminAddEditCalendar extends Component {
    state = {
        isEdit: false,
        formError: false,
        formSuccess: false,
        formdata: {
            slug: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race slug',
                    name: 'shortname_input',
                    type: 'text',
                    placeholder: 'Slug'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },            
            shortName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race short name',
                    name: 'shortname_input',
                    type: 'text',
                    placeholder: 'Race short name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            fullName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race full name',
                    name: 'fullname_input',
                    type: 'text',
                    placeholder: 'Race full name'
                },
                validation: {
                    required: true
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
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },    
            track: {
                element: 'select',
                value: '',
                config: {
                    label: 'Cirquit',
                    name: 'cirquit_input',
                    options: []
                },
                validation:{
                    required:true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },                        
            dateStart: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race start date',
                    name: 'datestart_input',
                    type: 'text',
                    placeholder: 'Race start date'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },   
            dateEnd: {
                element: 'input',
                value: '',
                config: {
                    label: 'Race end date',
                    name: 'dateend_input',
                    type: 'text',
                    placeholder: 'Race end date'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            headingImage: {
                value: [],
                config: {
                    label: 'Race Heading Image'
                },
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true                
            }              
        }
    };

    _breadcrumbsLinks = [{
        title: '< Back To Calendar',
        linkTo: '/admin/calendar'
    }];      

    componentDidMount() {
        const raceId = this.props.match.params.id;
        if(raceId !== undefined){
            this.props.dispatch(getRaceById(raceId)).then((response) => {
                if (!this.props.calendar.races) {
                    this.props.history.push('/admin/calendar');
                } else {
                    //this.props.driver.drivers.dateOfBirth = moment(this.props.driver.drivers.dateOfBirth).format("DD/MM/YYYY");
                    const newFormdata = populateFields(this.state.formdata, this.props.calendar.races);
                    const { headingImage } = this.props.calendar.races;
                    this.setState({
                        isEdit: true,
                        formdata: newFormdata
                    }, () => {
                        this.imagesHandler(headingImage, 'headingImage');
                        this.refs.raceHeadingImageUploader.updateUploadedImages(headingImage, 'headingImage');                        
                    });
                }
            });
        }

        const formdata = this.state.formdata;
        this.props.dispatch(getRaceCountries()).then((response) => {
            const newFormdata = populateOptionFields(formdata, this.props.calendar.countries, 'country');
            this.updateFields(newFormdata);
        });    

        this.props.dispatch(getRaceTracks()).then((response) => {
            const newFormdata = populateOptionFields(formdata, this.props.calendar.tracks, 'track');
            this.updateFields(newFormdata);
        });              
    };

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add-edit-calendar');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }; 
    
    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'add-edit-calendar');

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.history.push('/admin/calendar');
            });
        }, 2000);
    };    

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'add-edit-calendar');        
        let formIsValid = isFormValid(this.state.formdata, 'add-edit-calendar');
        
        if(this.props.match.params.id !== undefined){
            dataToSubmit.id = this.props.match.params.id;
            //dataToSubmit.dateOfBirth = moment(dataToSubmit.dateOfBirth, "MM/DD/YYYY");
        }        

        if (formIsValid) {
            //console.log(dataToSubmit);
            if (!this.state.isEdit) {
                this.props.dispatch(addRace(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.calendar.addRace.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            } else {
                this.props.dispatch(updateRace(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.calendar.editRace) {
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
                        <Typography variant="h6" style={{margin:'1em 0'}}>{this.state.isEdit ? 'Edit' : 'Add'} Race</Typography>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="raceHeadingImageUploader"
                                    id={'headingImage'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.headingImage}
                                />
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'slug'}
                                    formdata={this.state.formdata.slug}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'shortName'}
                                    formdata={this.state.formdata.shortName}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>  
                        <div className="row">
                            <div className="col-md-12">
                                <FormField 
                                    id={'fullName'}
                                    formdata={this.state.formdata.fullName}
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
                                    id={'track'}
                                    formdata={this.state.formdata.track}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'dateStart'}
                                    formdata={this.state.formdata.dateStart}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>  
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'dateEnd'}
                                    formdata={this.state.formdata.dateEnd}
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
                                <div className="alert alert-dismissible alert-success">Race successfully added to database</div> 
                            : null
                        }
                        <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>{this.state.isEdit ? 'Edit' : 'Add'} Race</button>                        
                    </fieldset>
                </form>             
            </UserLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar
    };
};

export default connect(mapStateToProps)(AdminAddEditCalendar);