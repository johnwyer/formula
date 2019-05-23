import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getTeams } from '../../actions/site/team_actions';
import TeamsList from './list';

import { connect } from 'react-redux';

class TeamsIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''        
    };

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
            await this.props.dispatch(getTeams());

            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        } catch(error) {
            this.setState({
                loading: false,
                error: true,
                errorMessage: error.toString()
            });
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <TeamsList teams={this.props.site.teams} /> : null;

        return (
            <SiteLayout classes="team-page">
                <h2 className="page-title">Formula 1&reg; Teams</h2>
                { errorIndicator }
                { spinner }
                { content }                   
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