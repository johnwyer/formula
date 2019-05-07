import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getRaceBySlug } from '../../actions/site/calendar_actions';
import CalendarDetail from './detail';

import { connect } from 'react-redux';

class CalendarDetailIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        const raceSlug = this.props.match.params.slug;
        if(raceSlug !== undefined){
            this.props.dispatch(getRaceBySlug(raceSlug)).then(() => {
                if (!this.props.site.race) {
                    this.props.history.push('/calendar');
                } else {
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);
                }
            });
        } else {
            this.props.history.push('/calendar');
        }
    };

    render() {
        return (
            <SiteLayout classes="calendar-detail-page">
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <CalendarDetail race={this.props.site.race} />
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

export default connect(mapStateToProps)(CalendarDetailIndex);