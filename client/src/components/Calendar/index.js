import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import LoadingIndicator from '../utils/loading-indicator';
import { getRaces } from '../../actions/site/calendar_actions';
import CalendarList from './calendar-list';
//import moment from 'moment';

import { connect } from 'react-redux';

class CalendarIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        this.props.dispatch(getRaces()).then(() => {
            /*
            this.props.dispatch(getDriversList()).then(() => {

                this.props.site.races.map((item) => {
                    item.trackImage = (item.track.trackImage.length > 0) ? item.track.trackImage[0].url : '';
                    item.isExpired = moment(item.dateEnd) < moment() ? true : false;
                    item.raceWinner = '';

                    if(item.result.length !== 0){
                        this.props.site.driversList.forEach(element => {
                            if(element.id === item.result[0].position_1.driver){
                                item.raceWinner = element.name;
                            }
                        });
                    }

                    return item;                
                });
            });*/
            
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    render() {
        return (
            <SiteLayout classes="calendar-page">
                <h2 className="page-title">F1 Schedule - 2019 FIA Formula One World Championship&reg; Race Calendar</h2>
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <CalendarList races={this.props.site.races} />
                    )                    
                }                     
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