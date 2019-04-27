import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getTeams } from '../../actions/site/site_actions';
import TeamsList from './list';

import { connect } from 'react-redux';

class TeamsIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        this.props.dispatch(getTeams()).then(() => {
            this.props.site.teams.map((item) => {
                item.teamLogo = (item.teamLogo.length > 0) ? item.teamLogo[0].url : '';
                item.teamCarImage = (item.teamCarImage.length > 0) ? item.teamCarImage[0].url : '';
                return item;
            });
            
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    render() {
        return (
            <SiteLayout classes="team-page">
                <h2 className="page-title">Formula 1&reg; Teams</h2>
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <TeamsList teams={this.props.site.teams} />
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
};

export default connect(mapStateToProps)(TeamsIndex);