import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getTeamBySlug } from '../../actions/site/site_actions';
import TeamDetail from './detail';

import { connect } from 'react-redux';

class TeamsDetailIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        const teamSlug = this.props.match.params.slug;
        console.log(this.props.match.params.slug);
        if(teamSlug !== undefined){
            this.props.dispatch(getTeamBySlug(teamSlug)).then(() => {
                if (!this.props.site.team) {
                    this.props.history.push('/teams');
                } else {
                    const { teamLogo, teamCarImage, driver_1, driver_2 } = this.props.site.team;
                    this.props.site.team.teamLogo = (teamLogo.length > 0) ? teamLogo[0].url : '';
                    this.props.site.team.teamCarImage = (teamCarImage.length > 0) ? teamCarImage[0].url : '';
                    this.props.site.team.driver_1.driverImage = (driver_1.driverImage.length > 0) ? driver_1.driverImage[0].url : '';
                    this.props.site.team.driver_2.driverImage = (driver_2.driverImage.length > 0) ? driver_2.driverImage[0].url : '';
                    
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);
                }
            });
        } else {
            this.props.history.push('/teams');
        }
    };

    render() {
        return (
            <SiteLayout classes="team-page-wrapper">
                <div className="team-page">
                    {
                        this.state.loading ? 
                        (
                            <LoadingIndicator />
                        )
                        :
                        ( 
                            <TeamDetail team={this.props.site.team} />
                        )                    
                    }                    
                </div>
            </SiteLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(TeamsDetailIndex);