import React, { Component } from 'react';
import { update, generateData, isFormValid } from '../utils/Form/formActions';
import FormField from '../utils/Form/formfield';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/admin/user_actions';

class Login extends Component {
    state = {
        formError: false,
        formSuccess: '',
        formdata: {
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
                showLabel: true,
                valid: false,
                touched: false,                
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    label: 'Password',
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true
                },
                showLabel: true,
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    };

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    };

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'login');
        let formIsValid = isFormValid(this.state.formdata, 'login');
        //console.log('dataToSubmit ', dataToSubmit);
        //console.log('formIsValid ', formIsValid);

        if(formIsValid){
            //console.log('formIsValid: ', formIsValid);
            this.props.dispatch(loginUser(dataToSubmit)).then((response) => {
                if(response.payload.loginSuccess){
                    //console.log(response.payload);
                    this.props.history.push('/user/dashboard');
                } else {
                    this.setState({
                        formError: true
                    });
                }
            });
        }
        else {
            this.setState({
                formError: true
            });
        }
    };

    render() {
        return (
            <form onSubmit={(event) => this.submitForm(event)}>
                <FormField 
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element) => this.updateForm(element)}
                />
                <FormField 
                    id={'password'}
                    formdata={this.state.formdata.password}
                    change={(element) => this.updateForm(element)}
                />
                { 
                    this.state.formError ? 
                        <div className="alert alert-dismissible alert-danger">Please check your data</div>
                    : null 
                }  
                <button className="btn btn-primary" onClick={(event) => this.submitForm(event)}>Log in</button>
                {/* 
                <button className="btn btn-outline-primary" type="button" style={{marginLeft: '10px'}} onClick={() => this.props.history.push('/reset-user')}>Forgot password?</button>                              
                */}
            </form>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ...state
    }
};

export default connect(mapStateToProps)(withRouter(Login));