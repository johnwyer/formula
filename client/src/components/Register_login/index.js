import React from 'react';
import Login from './login';
import MyButton from '../utils/button';

const RegisterLogin = () => {
    return (
        <div className="container">
            <div className="register-login">
                <div className="row">
                    <div className="col-md-6 register-login-col">                    
                        <h3>New user?</h3>
                        <p>Please register</p>
                        <MyButton 
                            type="default"  
                            altClass={'btn btn-outline-primary'}
                            title="Create an account" 
                            linkTo="/register" 
                            addStyles={{margin:'10px 0 0 0'}} 
                        />
                    </div>
                    <div className="col-md-6 register-login-col">
                        <h3>Registered user?</h3>
                        <p>If you have an account please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;