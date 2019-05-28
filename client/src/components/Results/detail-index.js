import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getResultBySlug } from '../../actions/site/result_actions';
import ResultsDetailList from './detail-list';

import { connect } from 'react-redux';

class ResultsDetailIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''        
    };

    componentDidMount(){
        this.getData();
    };

    getData = async() => {
        const raceSlug = this.props.match.params.slug;
        if(raceSlug !== undefined){
            this.setState({
                loading: true,
                error: false,
                errorMessage: ''
            });

            try {
                await this.props.dispatch(getResultBySlug(raceSlug));
                if (!this.props.site.result) {
                    this.props.history.push('/results');    
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
                    errorMessage: String(error)
                });
            }            
        } else {
            this.props.history.push('/results');
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <ResultsDetailList result={this.props.site.result} /> : null;

        return (
            <SiteLayout classes="results-page">
                <div className="resultsarchive-wrapper">
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

export default connect(mapStateToProps)(ResultsDetailIndex);