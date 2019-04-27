import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/admin/user_actions';

class Header extends Component {
    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },          
            {
                name: 'Drivers',
                linkTo: '/drivers',
                public: true
            },              
            {
                name: 'Teams',
                linkTo: '/teams',
                public: true
            },
            {
                name: 'Races',
                linkTo: '/calendar',
                public: true
            },
            {
                name: 'Standings',
                linkTo: '/results',
                public: true
            }           
        ],
        user: [
            {
                name: 'Log in',
                linkTo: '/register-login',
                public: true
            },
            {
                name: 'Dashboard',
                linkTo: '/user/dashboard',
                public: false
            },               
            {
                name: 'Log out',
                linkTo: '#',
                public: false
            }            
        ]
    }

    logoutHandler = (event) => {
        event.preventDefault();
        console.log('logout handler');
        
        this.props.dispatch(logoutUser()).then((response) => {
            if(response.payload.success){
                this.props.history.push('/');
            }
        });
    };

    renderLink = (item, i) => {
        return item.name === 'Log out' ? 
            (
                <li className="nav-item" key={i}>
                    <Link to={item.linkTo} className={'nav-link'} onClick={(event) => this.logoutHandler(event)}>{item.name}</Link>
                </li>
            )
        : 
            (
                <li className="nav-item" key={i}>
                    <Link to={item.linkTo} className={'nav-link'}>{item.name}</Link>
                </li>
            )
    };

    showLinks = (type) => {
        let list = [];
        if(this.props.user.userData){
            type.forEach((item) => {
                if(!this.props.user.userData.isAuth){
                    if(item.public === true) {
                        list.push(item);
                    }
                } else {
                    if(item.name !== 'Log in'){
                        list.push(item);
                    }
                }
            });
        }

        return list.map((item, i) => {
            return this.renderLink(item, i);
        });
    };

    render() {
        return (
            <header id="header">
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                    <div className="container">
                        <a className="navbar-brand" href="/">Navbar</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                { this.showLinks(this.state.page) }
                            </ul>

                            <ul className="navbar-nav my-2 my-lg-0">
                                { this.showLinks(this.state.user) }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>        
        )
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default connect(mapStateToProps)(withRouter(Header));