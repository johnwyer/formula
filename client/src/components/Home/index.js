import React, { Component } from 'react';

import HomeDriverStandings from './driver-standings';
import HomeTeamStandings from './team-standings';
import HomeLastResult from './last-result';

class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="f1-standings">
                    <HomeDriverStandings />
                    <HomeTeamStandings />
                    <HomeLastResult />
                </div>          
            </div>
        )
    }
};

export default Home;