import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getDriverStandings, getTeamStandings, getLastResult } from '../../actions/site/result_actions';

import { connect } from 'react-redux';

import HomeDriverStandings from './driver-standings';
import HomeTeamStandings from './team-standings';
import HomeLastResult from './last-result';

class Home extends Component {
    state = {
        loading: true,
        activeTab: 'drivers',
        error: false,
        errorMessage: ''
    };

    _tabList = [
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
    
    componentDidMount(){
        this.getData();
    };

    getData = async () => {
        this.setState({
            loading: true,
            error: false,
            errorMessage: ''
        });

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
                loading: false,
                error: true,
                errorMessage: error.toString()
            });
        }
    };

    renderTabs = () => {
        return this._tabList.map((tab) => {
            let isActive = tab.tab === this.state.activeTab ? 'active' : '';
            return (
                <li className="f1-tab nav-item" key={tab.tab}>
                    <a href={`#${tab.tab}`} className={`nav-link ${isActive}`} data-toggle="tab">{tab.title}</a>
                </li> 
            )
        })
    };

    renderContent = () => (
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
    );
    
    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? this.renderContent() : null;

        return (
            <SiteLayout classes="home-page">
                { errorIndicator }
                { spinner }
                { content }
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    }
;}

export default connect(mapStateToProps)(Home);