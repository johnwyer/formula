import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import FileUpload from '../../../utils/Form/fileupload';
import { update, generateData, isFormValid, populateFields, populateOptionFields, resetFields } from '../../../utils/Form/formActions';
import { addDriver, getDriverById, updateDriver, getDriverCountries } from '../../../../actions/admin/driver_actions';
//import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminAddEditDriver extends Component {
    state = {
        isEdit: false,
        formError: false,
        formSuccess: false,
        formdata: {
            slug: {
                element: 'input',
                value: '',
                config: {
                    label: 'Driver slug',
                    name: 'shortname_input',
                    type: 'text',
                    placeholder: 'Slug'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },              
            firstName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Firstname',
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Driver firstname'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            lastName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Lastname',
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Driver lastname'
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
            number: {
                element: 'input',
                value: '',
                config: {
                    label: 'Number',
                    name: 'number_input',
                    type: 'number',
                    placeholder: 'Driver number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            podiums: {
                element: 'input',
                value: '',
                config: {
                    label: 'Podiums',
                    name: 'podiums_input',
                    type: 'number',
                    placeholder: 'Driver podiums'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            points: {
                element: 'input',
                value: '',
                config: {
                    label: 'Points',
                    name: 'points_input',
                    type: 'number',
                    placeholder: 'Driver points'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            grandPrix: {
                element: 'input',
                value: '',
                config: {
                    label: 'Grand Prix',
                    name: 'grandPrix_input',
                    type: 'number',
                    placeholder: 'Driver Grand Prix'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            worldChampionships: {
                element: 'input',
                value: '',
                config: {
                    label: 'World Championships',
                    name: 'worldChampionships_input',
                    type: 'number',
                    placeholder: 'Driver World Championships'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            highestRaceFinish: {
                element: 'input',
                value: '',
                config: {
                    label: 'Highest race finish',
                    name: 'highestRaceFinish_input',
                    type: 'number',
                    placeholder: 'Driver Highest race finish'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            numberOfWictories: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nr of wictories',
                    name: 'numberOfWictories_input',
                    type: 'number',
                    placeholder: 'Number of wictories'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            polePositions: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nr of pole positions',
                    name: 'polePositions_input',
                    type: 'number',
                    placeholder: 'Number of pole positions'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            dateOfBirth: {
                element: 'input',
                value: '',
                config: {
                    label: 'Date of birth',
                    name: 'dateOfBirth_input',
                    type: 'text',
                    placeholder: 'Drivers date of birth'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            placeOfBirth: {
                element: 'input',
                value: '',
                config: {
                    label: 'Place of birth',
                    name: 'placeOfBirth_input',
                    type: 'text',
                    placeholder: 'Drivers place of birth'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            driverImage: {
                value: [],
                config: {
                    label: 'Driver Image'
                },                
                validation: {
                    required:true
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true                
            },
            driverHelmetImage: {
                value: [],
                config: {
                    label: 'Driver Helmet'
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
        title: '< Back To Drivers',
        linkTo: '/admin/drivers'
    }];  
    //child = React.createRef();

    componentDidMount() {
        const driverId = this.props.match.params.id;
        if(driverId !== undefined){
            this.props.dispatch(getDriverById(driverId)).then((response) => {
                if (!this.props.driver.drivers) {
                    this.props.history.push('/admin/drivers');
                } else {
                    //this.props.driver.drivers.dateOfBirth = moment(this.props.driver.drivers.dateOfBirth).format("DD/MM/YYYY");
                    const { driverImage, driverHelmetImage } = this.props.driver.drivers;
                    const newFormdata = populateFields(this.state.formdata, this.props.driver.drivers);                
                    this.setState({
                        isEdit: true,
                        formdata: newFormdata
                    }, () => {
                        this.imagesHandler(driverImage, 'driverImage');
                        this.refs.driverImageUploader.updateUploadedImages(driverImage);

                        this.imagesHandler(driverHelmetImage, 'driverHelmetImage');
                        this.refs.driverHelmetImageUploader.updateUploadedImages(driverHelmetImage);                        
                    });
                }
            });
        }

        const formdata = this.state.formdata;
        this.props.dispatch(getDriverCountries()).then((response) => {
            const newFormdata = populateOptionFields(formdata, this.props.driver.countries, 'country');
            this.updateFields(newFormdata);
        });
    };

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add-edit-driver');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'add-edit-driver');

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.history.push('/admin/drivers');
                //console.log(this.state.formdata);
            });
        }, 2000);
    };
    
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'add-edit-driver');        
        let formIsValid = isFormValid(this.state.formdata, 'add-edit-driver');
        
        if(this.props.match.params.id !== undefined){
            dataToSubmit.id = this.props.match.params.id;
            //dataToSubmit.dateOfBirth = moment(dataToSubmit.dateOfBirth, "MM/DD/YYYY");
        }        

        if (formIsValid) {
            //console.log(dataToSubmit);
            if (!this.state.isEdit) {
                this.props.dispatch(addDriver(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.driver.addDriver.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            } else {
                this.props.dispatch(updateDriver(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.driver.editDriver) {
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
                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Driver</Typography>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="driverImageUploader"
                                    id={'driverImage'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.driverImage}
                                />
                            </div>
                        </div> 
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="driverHelmetImageUploader"
                                    id={'driverHelmetImage'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.driverHelmetImage}
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
                                    id={'firstName'}
                                    formdata={this.state.formdata.firstName}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div> 
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'lastName'}
                                    formdata={this.state.formdata.lastName}
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
                                    id={'number'}
                                    formdata={this.state.formdata.number}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'podiums'}
                                    formdata={this.state.formdata.podiums}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'points'}
                                    formdata={this.state.formdata.points}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'grandPrix'}
                                    formdata={this.state.formdata.grandPrix}
                                    change={(element) => this.updateForm(element)}
                                />           
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'worldChampionships'}
                                    formdata={this.state.formdata.worldChampionships}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'highestRaceFinish'}
                                    formdata={this.state.formdata.highestRaceFinish}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'numberOfWictories'}
                                    formdata={this.state.formdata.numberOfWictories}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'polePositions'}
                                    formdata={this.state.formdata.polePositions}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>  
                        <div className="row">
                            <div className="col-md-6" >
                                <FormField 
                                    id={'dateOfBirth'}
                                    formdata={this.state.formdata.dateOfBirth}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>  
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'placeOfBirth'}
                                    formdata={this.state.formdata.placeOfBirth}
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
                                <div className="alert alert-dismissible alert-success">Driver successfully added to database</div> 
                            : null
                        }
                        <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>{this.state.isEdit ? 'Edit' : 'Add'} Driver</button>
                    </fieldset> 
                </form> 
            </UserLayout>
        )
    }
}
                                                                                                                                        
const mapStateToProps = (state) => {
    return {
        driver: state.driver
    };
};

export default connect(mapStateToProps)(AdminAddEditDriver);