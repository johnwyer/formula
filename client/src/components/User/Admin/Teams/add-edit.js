import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import FileUpload from '../../../utils/Form/fileupload';
import { update, generateData, isFormValid, populateFields, populateOptionFields, resetFields } from '../../../utils/Form/formActions';
import { addTeam, getTeamById, updateTeam, getTeamCountries, getTeamDrivers } from '../../../../actions/admin/team_actions';
//import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminAddEditTeam extends Component {
    state = {
        isEdit: false,
        formError: false,
        formSuccess: false,
        formdata: {
            slug: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team slug',
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
            teamColor: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team Color',
                    name: 'teamColor_input',
                    type: 'text',
                    placeholder: 'Team Color'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },                        
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
            shortName: {
                element: 'input',
                value: '',
                config: {
                    label: 'Short Name',
                    name: 'shortName_input',
                    type: 'text',
                    placeholder: 'Team Short Name'
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
            driver_1: {
                element: 'select',
                value: '',
                config: {
                    label: 'First Pilot',
                    name: 'driver_1_input',
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
            driver_2: {
                element: 'select',
                value: '',
                config: {
                    label: 'Second Pilot',
                    name: 'driver_2_input',
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
            base: {
                element: 'input',
                value: '',
                config: {
                    label: 'Base',
                    name: 'base_input',
                    type: 'text',
                    placeholder: 'Team Base'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            teamChief: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team Chief',
                    name: 'teamChief_input',
                    type: 'text',
                    placeholder: 'Team Chief'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            technicalChief: {
                element: 'input',
                value: '',
                config: {
                    label: 'Team Technical Chief',
                    name: 'technicalChief_input',
                    type: 'text',
                    placeholder: 'Team Technical Chief'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            chassisNumber: {
                element: 'input',
                value: '',
                config: {
                    label: 'Chassis Number',
                    name: 'chassisNumber_input',
                    type: 'text',
                    placeholder: 'Chassis Number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            powerUnit: {
                element: 'input',
                value: '',
                config: {
                    label: 'Power Unit',
                    name: 'powerUnit_input',
                    type: 'text',
                    placeholder: 'Power Unit'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            firstTeamEntry: {
                element: 'input',
                value: '',
                config: {
                    label: 'First Team Entry',
                    name: 'firstTeamEntry_input',
                    type: 'number',
                    placeholder: 'First Team Entry'
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
                    placeholder: 'World Championships'
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
                    label: 'Highest Race Finish',
                    name: 'highestRaceFinish_input',
                    type: 'number',
                    placeholder: 'Highest Race Finish'
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
            fastestLaps: {
                element: 'input',
                value: '',
                config: {
                    label: 'Fastest Laps',
                    name: 'fastestLaps_input',
                    type: 'number',
                    placeholder: 'Fastest Laps'
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
                    placeholder: 'Podiums'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },                   
            teamLogo: {
                value: [],
                config: {
                    label: 'Team Logo'
                },
                validation: {
                    required:false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showLabel: true                
            },
            teamCarImage: {
                value: [],
                config: {
                    label: 'Team Car Image'
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
        title: '< Back To Teams',
        linkTo: '/admin/teams'
    }];    
    //child = React.createRef();

    componentDidMount() {
        const teamId = this.props.match.params.id;
        if(teamId !== undefined){
            this.props.dispatch(getTeamById(teamId)).then((response) => {
                if (!this.props.team.teams) {
                    this.props.history.push('/admin/teams');
                } else {
                    const newFormdata = populateFields(this.state.formdata, this.props.team.teams);   
                    const { teamLogo, teamCarImage } = this.props.team.teams;
                    this.setState({
                        isEdit: true,
                        formdata: newFormdata
                    }, () => {
                        this.imagesHandler(teamLogo, 'teamLogo');
                        this.refs.teamLogoUploader.updateUploadedImages(teamLogo, 'teamLogo');
                        this.imagesHandler(teamCarImage, 'teamCarImage');
                        this.refs.teamCarImageUploader.updateUploadedImages(teamCarImage, 'teamCarImage');
                    });
                }
            });
        }

        const formdata = this.state.formdata;
        this.props.dispatch(getTeamCountries()).then((response) => {
            const newFormdata = populateOptionFields(formdata, this.props.team.countries, 'country');
            this.updateFields(newFormdata);
        });

        this.props.dispatch(getTeamDrivers()).then((response) => {
            let newFormdata = populateOptionFields(formdata, this.props.team.drivers, 'driver_1');
            this.updateFields(newFormdata);
            newFormdata = populateOptionFields(formdata, this.props.team.drivers, 'driver_2');
            this.updateFields(newFormdata);
        });
    };

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add-edit-team');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'add-edit-team');

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.history.push('/admin/teams');
            });
        }, 2000);
    };
    
    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'add-edit-team');        
        let formIsValid = isFormValid(this.state.formdata, 'add-edit-team');
        
        if(this.props.match.params.id !== undefined){
            dataToSubmit.id = this.props.match.params.id;
            //dataToSubmit.dateOfBirth = moment(dataToSubmit.dateOfBirth, "MM/DD/YYYY");
        }        

        if (formIsValid) {
            //console.log(dataToSubmit);
            if (!this.state.isEdit) {
                this.props.dispatch(addTeam(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.team.addTeam.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            } else {
                this.props.dispatch(updateTeam(dataToSubmit)).then(() => {
                    console.log('props ', this.props);
                    if (this.props.team.editTeam) {
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
                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Team</Typography>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="teamLogoUploader"
                                    id={'teamLogo'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.teamLogo}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FileUpload 
                                    ref="teamCarImageUploader"
                                    id={'teamCarImage'}
                                    imagesHandler={ (image, field) => this.imagesHandler(image, field) } 
                                    reset={ this.state.formSuccess }
                                    formdata={this.state.formdata.teamCarImage}
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
                                    id={'teamColor'}
                                    formdata={this.state.formdata.teamColor}
                                    change={(element) => this.updateForm(element)}
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
                                    id={'shortName'}
                                    formdata={this.state.formdata.shortName}
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
                                    id={'driver_1'}
                                    formdata={this.state.formdata.driver_1}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-md-6">
                                <FormField
                                    id={'driver_2'}
                                    formdata={this.state.formdata.driver_2}
                                    change={(element) => this.updateForm(element)}
                                />                           
                            </div>
                        </div>                                                                      
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'base'}
                                    formdata={this.state.formdata.base}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'teamChief'}
                                    formdata={this.state.formdata.teamChief}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'technicalChief'}
                                    formdata={this.state.formdata.technicalChief}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'chassisNumber'}
                                    formdata={this.state.formdata.chassisNumber}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'powerUnit'}
                                    formdata={this.state.formdata.powerUnit}
                                    change={(element) => this.updateForm(element)}
                                />           
                            </div>
                        </div>   
                        <div className="row">
                            <div className="col-md-6">
                                <FormField 
                                    id={'firstTeamEntry'}
                                    formdata={this.state.formdata.firstTeamEntry}
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
                                    id={'fastestLaps'}
                                    formdata={this.state.formdata.fastestLaps}
                                    change={(element) => this.updateForm(element)}
                                />                     
                            </div> 
                        </div>    
                        <div className="row">
                            <div className="col-md-6" >
                                <FormField 
                                    id={'podiums'}
                                    formdata={this.state.formdata.podiums}
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
                                <div className="alert alert-dismissible alert-success">Team successfully added to database</div> 
                            : null
                        }
                        <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>{this.state.isEdit ? 'Edit' : 'Add'} Team</button>
                    </fieldset> 
                </form> 
            </UserLayout>
        )
    }
}
                                                                                                                                        
const mapStateToProps = (state) => {
    return {
        team: state.team
    };
};

export default connect(mapStateToProps)(AdminAddEditTeam);