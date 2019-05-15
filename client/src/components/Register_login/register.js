import React, { Component } from 'react';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { registerUser } from '../../actions/admin/user_actions';

class Register extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            firstname: {
                element: 'input',
                value: '',
                config: {
                    label: "Firstname",
                    name: 'firstname_input',
                    type: 'text',
                    placeholder: 'Enter your firstname'
                },
                validation: {
                    required: true
                },
                showLabel: false,
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    label: "Lastname",
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true
                },
                showLabel: false,
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: "Email",
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                showLabel: false,
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    label: "Password",
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                },
                showLabel: false,
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    label: "Confirm password",
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'Confrim your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                showLabel: false,
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'register');
        let formIsValid = isFormValid(this.state.formdata, 'register');

        if (formIsValid) {
            //console.log('submitForm formIsValid ', formIsValid);
            //console.log('submitForm dataToSubmit ', dataToSubmit);
            this.props.dispatch(registerUser(dataToSubmit)).then((response) => {
                //console.log(response);
                if (response.payload.success) {
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });

                    setTimeout(() => {
                        this.props.history.push('/register-login');
                    }, 3000);
                } else {
                    this.setState({
                        formError: true
                    });
                }
            }).catch((error) => {
                this.setState({
                    formError: true
                });
            });
        } else {
            //console.log('submitForm formIsValid ', formIsValid);
            this.setState({
                formError: true
            });
        }
    };

    render() {
        return ( 
            <div className="container">
                <div className="register-login">    
                    <form onSubmit={ (event) => this.submitForm(event) }>
                        <fieldset>
                            <h4>Personal information</h4> 
                            <div className="row">
                                <div className="col-md-6">
                                    <FormField id={'firstname'}
                                        formdata={ this.state.formdata.firstname }
                                        change={ (element) => this.updateForm(element) }
                                    />                     
                                </div> 
                                <div className="col-md-6">
                                    <FormField id = { 'lastname' }
                                        formdata = { this.state.formdata.lastname }
                                        change = { (element) => this.updateForm(element) }
                                    /> 
                                </div> 
                            </div> 
                            <div className="row">
                                <div className = "col-md-6" >
                                    <FormField 
                                        id={'email'}
                                        formdata={ this.state.formdata.email }
                                        change={ (element) => this.updateForm(element) }
                                    />                         
                                </div> 
                            </div> 
                        </fieldset> 
                        <fieldset>
                            <h4>Verify password</h4> 
                            <div className = "row">
                                <div className = "col-md-6">
                                    <FormField 
                                        id={'password'}
                                        formdata={ this.state.formdata.password }
                                        change={ (element) => this.updateForm(element) }
                                    /> 
                                </div> 
                                <div className = "col-md-6">
                                    <FormField 
                                        id={'confirmPassword'}
                                        formdata={ this.state.formdata.confirmPassword }
                                        change={ (element) => this.updateForm(element) }
                                    />                         
                                </div> 
                            </div>
                            {
                                this.state.formError ?
                                    <div className="alert alert-dismissible alert-danger">Please check your data</div> 
                                : null
                            } 
                            <button className = "btn btn-primary" onClick = { (event) => this.submitForm(event) }>Create an account</button> 
                        </fieldset> 
                    </form> 
                    <Dialog open={ this.state.formSuccess }>
                        <DialogTitle id="alert-dialog-title">{ "Congratulation!" }</DialogTitle> 
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                You will be redirected to the LOGIN in a couple of seconds... 
                            </DialogContentText> 
                        </DialogContent> 
                    </Dialog> 
                </div>
            </div>
        )
    }
};

export default connect()(Register);