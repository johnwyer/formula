import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getRaces } from '../../actions/site/calendar_actions';
import CalendarList from './calendar-list';

import { connect } from 'react-redux';

class CalendarIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''        
    };

    componentDidMount(){
        this.getData();
    };

    getData = async() => {
        this.setState({
            loading: true,
            error: false,
            errorMessage: ''
        });

        try {
            await this.props.dispatch(getRaces());

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
        const content = hasData ? <CalendarList races={this.props.site.races} /> : null;

        return (
            <SiteLayout classes="calendar-page">
                <h2 className="page-title">F1 Schedule - 2019 FIA Formula One World Championship&reg; Race Calendar</h2>
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

export default connect(mapStateToProps)(CalendarIndex);