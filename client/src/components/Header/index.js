import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../actions/admin/user_actions';

class Header extends Component {
    state = {
        page: [         
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
                linkTo: '#',
                public: true,
                id: "standings",
                submenu: [
                    {
                        name: 'Season Standings',
                        linkTo: '/results',
                        public: true,
                        aria: "standings"
                    },
                    {
                        name: 'Driver Standings',
                        linkTo: '/results/drivers',
                        public: true,
                        aria: "standings"
                    },
                    {
                        name: 'Constructor Standings',
                        linkTo: '/results/teams',
                        public: true,
                        aria: "standings"
                    }
                ]
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

    renderSublinkItem = (item, key) => (
        <Link className="dropdown-item" to={item.linkTo} key={key}>{item.name}</Link>
    );

    renderLinkItem = (item, key, hasSubmenu) => {
        let listClasses = hasSubmenu ? 'nav-item dropdown' : 'nav-item';
        let linkClasses = hasSubmenu ? 'nav-link dropdown-toggle' : 'nav-link';

        if(hasSubmenu) { 
            return (
                <li className={listClasses} key={key}>
                    <a href={item.linkTo} 
                        className={linkClasses} 
                        id={`${item.id}Button`} 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        {item.name} <span className="caret"></span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby={item.id}>
                        { item.submenu.map((link, key) => this.renderSublinkItem(link, key * 10)) }
                    </div>
                </li>                
            )
        } else {
            return (
                <li className={listClasses} key={key}>
                    <Link to={item.linkTo} className={linkClasses}>{item.name}</Link>
                </li>
            )
        }
    };

    renderLink = (item, i) => {
        return item.name === 'Log out' ? 
            (
                <li className="nav-item" key={i}>
                    <Link to={item.linkTo} className={'nav-link'} onClick={(event) => this.logoutHandler(event)}>{item.name}</Link>
                </li>
            )
        : 
            item.hasOwnProperty('submenu') ?
                this.renderLinkItem(item, i, true)
                : this.renderLinkItem(item, i, false)
            
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
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <span><img src="/images/f1_logo.svg" alt="Formula 1" /></span>
                        </Link>
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