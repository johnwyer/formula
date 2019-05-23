import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/admin/user_actions';

import LoadingIndicator from '../components/utils/loading-indicator';
import WrappedErrorIndicator from '../components/utils/wrapped-error-indicator';
import ErrorIndicator from '../components/utils/error-indicator';

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true, 
            error: false,
            errorMessage: ''
        };
        
        componentDidMount() {
            this.getData();
        };       

        getData = async() => {
            this.setState({
                loading: true,
                error: false,
                errorMessage: ''
            });   

            try {
                await this.props.dispatch(auth());
                let user = this.props.user.userData;

                if (!user.isAuth) {
                    if (reload) {
                        this.props.history.push('/register-login');
                    } else {
                        this.setState({
                            loading: false                            
                        }); 
                    }
                } else {
                    if (adminRoute && !user.isAdmin) {
                        this.props.history.push('/user/dashboard');                  
                    } else {
                        if (reload === false) {
                            this.props.history.push('/user/dashboard');                         
                        } else {
                            this.setState({
                                loading: false
                            });
                        }
                    }
                }                
            } catch (error) {
                //console.log(error);
                //setTimeout(() => {
                    this.setState({
                    loading: false,
                    error: true,
                    errorMessage: error.toString()
                });
                //}, 20000)
            }            
        };

        render() {
            const { loading, error } = this.state;
            const hasData = !(loading || error);
            const errorMessage = error ? <WrappedErrorIndicator classes="auth-error"><ErrorIndicator message={this.state.errorMessage} reloadHandler={() => this.getData()} /></WrappedErrorIndicator> : null;
            const spinner = loading ? <LoadingIndicator classes={'auth-loader'} /> : null;
            const content = hasData ? <ComposedClass {...this.props} user={this.props.user} /> : null;            

            return (
                <React.Fragment>
                    { errorMessage }
                    { spinner }
                    { content }
                </React.Fragment>
            )
        };
    };

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    };

    return connect(mapStateToProps)(AuthenticationCheck);
};