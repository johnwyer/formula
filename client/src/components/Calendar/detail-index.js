import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getRaceBySlug } from '../../actions/site/calendar_actions';
import CalendarDetail from './detail';

import { connect } from 'react-redux';

class CalendarDetailIndex extends Component {
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
                await this.props.dispatch(getRaceBySlug(raceSlug));
                if (!this.props.site.race) {
                    this.props.history.push('/calendar');
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
            this.props.history.push('/calendar');
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <CalendarDetail race={this.props.site.race} /> : null;

        return (
            <SiteLayout classes="calendar-detail-page">
                { errorIndicator }
                { spinner }
                { content }  
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(CalendarDetailIndex);