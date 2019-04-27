import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields, populateOptionFields, resetFields } from '../../../utils/Form/formActions';
import { addResult, getResult, updateResult, getDrivers, getResultTemplate } from '../../../../actions/admin/result_actions';
//import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminAddEditResult extends Component {
    state = {
        isEdit: false,
        formError: false,
        formSuccess: false,
        formLength: 20,
        formdata: {
            race: {
                element: 'input',
                value: '',
                config: {
                    label: '',
                    name: 'race_input',
                    type: 'hidden',
                    placeholder: ''
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: false
            },            
            position_1: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },
            position_2: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },
            position_3: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_4: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_5: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_6: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_7: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },     
            position_8: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_9: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_10: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_11: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            }, 
            position_12: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_13: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },       
            position_14: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },      
            position_15: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_16: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },  
            position_17: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_18: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },   
            position_19: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            },
            position_20: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'position_1_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                driver: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_driver_input',
                        options: []
                    },
                    validation:{
                        required:true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                result: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }              
            }                                                                                                                                                                                 
        }
    };

    _breadcrumbsLinks = [{
        title: '< Back To Results',
        linkTo: '/admin/results'
    }];    
    //child = React.createRef();

    componentDidMount() {
        const raceId = this.props.match.params.id;
        if(this.props.match.url.includes('edit')) {
            this.props.dispatch(getResult(raceId)).then((response) => {
                const newFormdata = populateFields(this.state.formdata, this.props.result.result);
                this.setState({
                    isEdit: true,
                    formdata: newFormdata
                });
            });
        } else {            
            this.props.dispatch(getResultTemplate(raceId)).then((response) => {
                const newFormdata = populateFields(this.state.formdata, this.props.result.result);
                this.setState({
                    formdata: newFormdata
                });
            });
        }
        
        const formdata = this.state.formdata;
        this.props.dispatch(getDrivers()).then((response) => {
            Array.from({ length: this.state.formLength }).forEach((item, i)=> {
                let key = `position_${i + 1}.driver`;
                let newFormdata = populateOptionFields(formdata, this.props.result.drivers, key);
                this.updateFields(newFormdata);
            });
        });
    };

    updateFields = (newFormdata) => {
        this.setState({
            formdata: newFormdata
        });
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'add-edit-result');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    resetFieldsHandler = () => {
        const newFormdata = resetFields(this.state.formdata, 'add-edit-result');

        this.setState({
            formdata: newFormdata,
            formSuccess: true
        });

        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => {
                this.props.history.push('/admin/results');
            });
        }, 2000);
    };
    
    submitForm = (event) => {
        event.preventDefault();
        
        let dataToSubmit = generateData(this.state.formdata, 'add-edit-result');        
        let formIsValid = isFormValid(this.state.formdata, 'add-edit-result');

        console.log('dataToSubmit ', dataToSubmit);
        console.log('formIsValid ', formIsValid);

        if (formIsValid) {
            if (!this.state.isEdit) {
                this.props.dispatch(addResult(dataToSubmit)).then(() => {
                    if (this.props.result.addResult.success) {
                        this.resetFieldsHandler();
                    } else {
                        this.setState({
                            formError: true
                        });
                    }
                });
            } else {
                dataToSubmit.id = this.props.result.result.id;                
                this.props.dispatch(updateResult(dataToSubmit)).then(() => {
                    if (this.props.result.editResult) {
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

    renderFormWithoutResults = () => (
        Array.from({ length: this.state.formLength }).map((item,i)=> {
            let key = `position_${i + 1}`;
            return (
            <div className="row" key={key}>
                <div className="col-md-1">
                    <FormField 
                        id={`${key}.position`}
                        formdata={this.state.formdata[key].position}
                        change={(element) => this.updateForm(element)}
                    />                                 
                </div>
                <div className="col-md-6">
                    <FormField 
                        id={`${key}.driver`}
                        formdata={this.state.formdata[key].driver}
                        change={(element) => this.updateForm(element)}
                    />                     
                </div>
                <div className="col-md-5">
                    <FormField 
                        id={`${key}.result`}
                        formdata={this.state.formdata[key].result}
                        change={(element) => this.updateForm(element)}
                    />                     
                </div>                             
            </div>  
            )
        })
    );

    render() {
        return (
            <UserLayout>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                <form onSubmit={(event) => this.submitForm(event)}>
                    <FormField 
                            id={`race`}
                            formdata={this.state.formdata.race}
                            change={(element) => this.updateForm(element)}
                        />                                      
                    <fieldset>
                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Result</Typography>

                        { this.renderFormWithoutResults() }
   
                        {
                            this.state.formError ?
                                <div className="alert alert-dismissible alert-danger">Please check your data</div> 
                            : null
                        } 
                        {
                            this.state.formSuccess ?
                                <div className="alert alert-dismissible alert-success">Result successfully added to database</div> 
                            : null
                        }
                        <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>{this.state.isEdit ? 'Edit' : 'Add'} Result</button>
                    </fieldset> 
                </form>           
            </UserLayout>
        )
    }
}
                                                                                                                                        
const mapStateToProps = (state) => {
    return {
        result: state.result
    };
};

export default connect(mapStateToProps)(AdminAddEditResult);