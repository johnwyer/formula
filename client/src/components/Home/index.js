import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getDriverStandings, getTeamStandings, getLastResult } from '../../actions/site/result_actions';

import { connect } from 'react-redux';

import HomeDriverStandings from './driver-standings';
import HomeTeamStandings from './team-standings';
import HomeLastResult from './last-result';

class Home extends Component {
    state = {
        loading: true,
        activeTab: 'drivers'
    };

    _tabsList = [
        {
            tab: 'drivers',
            title: 'Drivers'      
        }, 
        {
           tab: 'constructors',
           title: 'Constructors'
        }, 
        {
            tab: 'last-race',
            title: 'Last Race'
        }
    ];
    
    async componentDidMount(){
        try {
            await this.props.dispatch(getDriverStandings());
            await this.props.dispatch(getTeamStandings());
            await this.props.dispatch(getLastResult());
            
            this.setState({
                loading: false
            });
        }
        catch(error) {
            this.setState({
                loading: false
            });
        }        
    };

    renderTabs = () => {
        return this._tabsList.map((tab) => {
            let isActive = tab.tab === this.state.activeTab ? 'active' : '';
            return (
                <li className="f1-tab nav-item" key={tab.tab}>
                    <a href={`#${tab.tab}`} className={`nav-link ${isActive}`} data-toggle="tab">{tab.title}</a>
                </li> 
            )
        })
    };
    
    render() {
        return (
            <SiteLayout classes="home-page">
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    (                        
                        <div className="f1-standings">
                            <div className="f1-tab-widget">
                                <div className="f1-tab-wrapper">
                                    <ul className="f1-tab-list nav nav-tabs">
                                        { this.renderTabs() }
                                    </ul>
                                </div>
                                <div className="f1-tab-content-wrapper tab-content">
                                    <HomeDriverStandings drivers={this.props.site.driverStandings} />
                                    <HomeTeamStandings teams={this.props.site.teamStandings} />
                                    <HomeLastResult result={this.props.site.lastResult} />
                                </div>
                            </div>
                        </div>                    
                    )                    
                }
            </SiteLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
;}

export default connect(mapStateToProps)(Home);