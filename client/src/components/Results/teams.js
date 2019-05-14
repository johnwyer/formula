import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import { getTeamStandings } from '../../actions/site/result_actions';
import ResultsTeamsList from './teams-list';

import { connect } from 'react-redux';

class ResultsTeamsIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.dispatch(getTeamStandings()).then(() => {           
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    render() {
        return (
            <SiteLayout classes={`results-page`}>
                <div className="resultsarchive-wrapper">
                    <h2 className="page-title">2019 Constructor Standings</h2>
                    {
                        this.state.loading ? 
                        (
                            <LoadingIndicator />
                        )
                        :
                        ( 
                            <ResultsTeamsList results={this.props.site.teamStandings} />
                        )                    
                    }  
                </div>
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(ResultsTeamsIndex);