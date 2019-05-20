import React, { Component } from 'react';

import HomeDriverStandings from './driver-standings';
import HomeTeamStandings from './team-standings';
import HomeLastResult from './last-result';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="f1-standings">
                    <div className="f1-tab-widget">
                        <div className="f1-tab-wrapper">
                            <ul className="f1-tab-list nav nav-tabs">
                                <li className="f1-tab nav-item">
                                    <a href="#drivers" className="nav-link active" data-toggle="tab">DRIVERS</a>
                                </li>
                                <li className="f1-tab nav-item">
                                    <a href="#constructors" className="nav-link" data-toggle="tab">CONSTRUCTORS</a>
                                </li>
                                <li className="f1-tab nav-item">
                                    <a href="#last-race" className="nav-link" data-toggle="tab">LAST RACE</a>
                                </li>
                            </ul>
                        </div>
                        <div className="f1-tab-content-wrapper tab-content">
                            <HomeDriverStandings />
                            <HomeTeamStandings />
                            <HomeLastResult />
                        </div>
                    </div>
                </div>          
            </div>
        )
    }
};

export default Home;