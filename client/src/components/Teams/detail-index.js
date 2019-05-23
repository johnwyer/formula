import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getTeamBySlug } from '../../actions/site/team_actions';
import TeamDetail from './detail';

import { connect } from 'react-redux';

class TeamsDetailIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''
    };

    componentDidMount(){
        this.getData();
    };

    getData = async() => {
        const teamSlug = this.props.match.params.slug;
        if(teamSlug !== undefined){
            this.setState({
                loading: true,
                error: false,
                errorMessage: ''
            });

            try {
                await this.props.dispatch(getTeamBySlug(teamSlug));
                if (!this.props.site.team) {
                    this.props.history.push('/teams');
                } else {                   
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);
                }
            } catch(error) {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: error.toString()
                });
            }
        } else {
            this.props.history.push('/teams');
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <TeamDetail team={this.props.site.team} /> : null;        

        return (
            <SiteLayout classes="team-page-wrapper">
                <div className="team-page">
                    { errorIndicator }
                    { spinner }
                    { content }
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