import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import { getResults } from '../../actions/site/result_actions';
import ResultsList from './index-list';

import { connect } from 'react-redux';

class ResultsIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount() {
        this.props.dispatch(getResults()).then(() => {           
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
                <h2 className="page-title">2019 RACE RESULTS</h2>
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <ResultsList results={this.props.site.results} />
                    )                    
                }  
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(ResultsIndex);