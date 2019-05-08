import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import { getResultBySlug } from '../../actions/site/result_actions';
import ResultsDetailList from './detail-list';

import { connect } from 'react-redux';

class ResultsDetailIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        const raceSlug = this.props.match.params.slug;
        if(raceSlug !== undefined){
            this.props.dispatch(getResultBySlug(raceSlug)).then(() => {      
                if (!this.props.site.result) {
                    this.props.history.push('/results');    
                } else {                     
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);
                }
            });
        } else {
            this.props.history.push('/results');
        }
    };

    render() {
        return (
            <SiteLayout classes="results-page">
                <div className="resultsarchive-wrapper">
                    {
                        this.state.loading ? 
                        (
                            <LoadingIndicator />
                        )
                        :
                        ( 
                            <ResultsDetailList result={this.props.site.result} />
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

export default connect(mapStateToProps)(ResultsDetailIndex);