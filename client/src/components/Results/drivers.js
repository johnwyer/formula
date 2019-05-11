import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import { getDriverStandings } from '../../actions/site/result_actions';
import ResultsDriversList from './drivers-list';

import { connect } from 'react-redux';

class ResultsDriversIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.dispatch(getDriverStandings()).then(() => {           
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
                    <h2 className="page-title">2019 Driver Standings</h2>
                    {
                        this.state.loading ? 
                        (
                            <LoadingIndicator />
                        )
                        :
                        ( 
                            <ResultsDriversList results={this.props.site.driverStandings} />
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

export default connect(mapStateToProps)(ResultsDriversIndex);