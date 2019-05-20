import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/admin/user_actions';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function(ComposedClass, reload, adminRoute = null) {
    class AuthenticationCheck extends Component {
        state = {
            loading: true
        };

        componentDidMount() {
            this.props.dispatch(auth()).then((response) => {
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
            });
        };

        render() {
            if(this.state.loading){
                return (
                    <div className="d-flex justify-content-center" style={{padding:'100px 0'}}>
                        <CircularProgress />
                    </div>
                )
            }

            return (
                <ComposedClass {...this.props} user={this.props.user} />
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