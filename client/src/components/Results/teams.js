import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getTeamStandings } from '../../actions/site/result_actions';
import ResultsTeamsList from './teams-list';

import { connect } from 'react-redux';

class ResultsTeamsIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''          
    };

    componentDidMount() {
        this.getData();
    };

    getData = async() => {
        this.setState({
            loading: true,
            error: false,
            errorMessage: ''
        });

        try {
            await this.props.dispatch(getTeamStandings());

            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        } catch(error) {
            this.setState({
                loading: false,
                error: true,
                errorMessage: String(error)
            });
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <ResultsTeamsList results={this.props.site.teamStandings} /> : null;

        return (
            <SiteLayout classes={`results-page`}>
                <div className="resultsarchive-wrapper">
                    <h2 className="page-title">2019 Constructor Standings</h2>
                    { errorIndicator }
                    { spinner }
                    { content }
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