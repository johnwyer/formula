import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import FormField from '../../../utils/Form/formfield';
import { update, generateData, isFormValid, populateFields, populateOptionFields, resetFields } from '../../../utils/Form/formActions';
import { addResult, getResult, updateResult, getDrivers, getResultTemplate } from '../../../../actions/admin/result_actions';

//import Divider from '@material-ui/core/Divider';
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
                    required: true
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
                        required: true
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
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_1_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required:true
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
                        name: 'position_2_position_input',
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
                        name: 'position_2_driver_input',
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
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_2_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_2_result_input',
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
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_2_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_3_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_3_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_3_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_3_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_3_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_4_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_4_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_4_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_4_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_4_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_5_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_5_driver_input',
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
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_5_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_5_result_input',
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
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_5_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_6_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_6_driver_input',
                        options: []
                    },
                    validation:{
                        required:true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_6_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_6_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_6_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_7_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_7_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_7_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_7_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_7_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_8_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_8_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_8_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_8_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_8_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_9_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_9_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_9_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_9_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_9_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_10_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_10_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_10_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_10_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_10_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_11_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_11_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_11_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_11_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_11_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_12_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_12_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_12_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_12_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_12_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_13_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_13_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_13_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_13_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_13_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_14_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_14_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_14_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_14_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_14_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_15_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_15_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_15_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_15_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_15_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_16_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_16_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_16_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_16_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_16_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_17_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_17_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_17_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_17_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_17_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_18_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_18_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_18_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_18_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_18_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_19_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_19_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_19_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_19_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_19_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                        name: 'position_20_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_20_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_20_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'position_20_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'position_20_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                }
            },
            fastestLap: {
                position: {
                    element: 'input',
                    value: '',
                    config: {
                        disabled: true,
                        label: '',
                        name: 'fastestLap_position_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'fastestLap_driver_input',
                        options: []
                    },
                    validation:{
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                laps: {
                    element: 'input',
                    value: '',
                    config: {
                        label: '',
                        name: 'fastestLap_laps_input',
                        type: 'text',
                        placeholder: ''
                    },
                    validation: {
                        required: true
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
                        name: 'fastestLap_result_input',
                        type: 'text',
                        placeholder: 'Result'
                    },
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false,
                    validationMessage: '',
                    showLabel: false
                },
                type: {
                    element: 'select',
                    value: '',
                    config: {
                        label: '',
                        name: 'fastestLap_type_input',
                        options: [
                            {
                                key: 'race',
                                value: 'Race'
                            },                        
                            {
                                key: 'fastest-lap',
                                value: 'Fastest Lap'
                            }
                        ]
                    },
                    validation:{
                        required: true
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
                let newFormdata = populateOptionFields(formdata, this.props.result.drivers, `position_${i + 1}.driver`);
                this.updateFields(newFormdata);
            });

            let newFormdata = populateOptionFields(formdata, this.props.result.drivers, `fastestLap.driver`);
            this.updateFields(newFormdata);
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
        Array.from({ length: this.state.formLength }).map((item, i) => {
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
                    <div className="col-md-4">
                        <FormField 
                            id={`${key}.driver`}
                            formdata={this.state.formdata[key].driver}
                            change={(element) => this.updateForm(element)}
                        />                     
                    </div>
                    <div className="col-md-1">
                        <FormField 
                            id={`${key}.laps`}
                            formdata={this.state.formdata[key].laps}
                            change={(element) => this.updateForm(element)}
                        />                     
                    </div>                    
                    <div className="col-md-4">
                        <FormField 
                            id={`${key}.result`}
                            formdata={this.state.formdata[key].result}
                            change={(element) => this.updateForm(element)}
                        />                     
                    </div>
                    <div className="col-md-2">
                        <FormField 
                            id={`${key}.type`}
                            formdata={this.state.formdata[key].type}
                            change={(element) => this.updateForm(element)}
                        />                     
                    </div>                    
                </div>  
            )
        })
    );

    renderFastestLap = () => {
        return (
            <div className="row" key='fastestLap'>
                <div className="col-md-1">
                    <FormField 
                        id={`fastestLap.position`}
                        formdata={this.state.formdata.fastestLap.position}
                        change={(element) => this.updateForm(element)}
                    />                                 
                </div>
                <div className="col-md-4">
                    <FormField 
                        id={`fastestLap.driver`}
                        formdata={this.state.formdata.fastestLap.driver}
                        change={(element) => this.updateForm(element)}
                    />                     
                </div>
                <div className="col-md-1">
                    <FormField 
                        id={`fastestLap.laps`}
                        formdata={this.state.formdata.fastestLap.laps}
                        change={(element) => this.updateForm(element)}
                    />                     
                </div>                    
                <div className="col-md-4">
                    <FormField 
                        id={`fastestLap.result`}
                        formdata={this.state.formdata.fastestLap.result}
                        change={(element) => this.updateForm(element)}
                    />                     
                </div>
                <div className="col-md-2">
                    <FormField 
                        id={`fastestLap.type`}
                        formdata={this.state.formdata.fastestLap.type}
                        change={(element) => this.updateForm(element)}
                    />
                </div>                    
            </div>            
        );
    };

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
                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Race Result</Typography>

                        { this.renderFormWithoutResults() }

                        <Typography variant="h6" style={{margin:'1em 0'}}>{ this.state.isEdit ? 'Edit' : 'Add' } Fastest Lap</Typography>

                        { this.renderFastestLap() }
   
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
    };
};
                                                                                                                                        
const mapStateToProps = (state) => {
    return {
        result: state.result
    };
};

export default connect(mapStateToProps)(AdminAddEditResult);