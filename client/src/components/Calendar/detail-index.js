import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getRaceBySlug, getTeamsDrivers } from '../../actions/site/calendar_actions';
import moment from 'moment';
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
                    const { headingImage, dateEnd, track } = this.props.site.race;
                    this.props.site.race.headingImage = (headingImage.length > 0) ? headingImage[0].url : '';
                    this.props.site.race.isExpired = moment(dateEnd) < moment() ? true : false;
                    this.props.site.race.track.trackConfiguration = (track.trackConfiguration.length > 0) ? track.trackConfiguration[0].url : '';

                    if(this.props.site.race.isExpired && this.props.site.race.result.length !== 0) {
                        this.props.dispatch(getTeamsDrivers()).then(() => {
                            Array.from({ length: this.props.site.teamsDrivers.length * 2 }).forEach((item, i) => {
                                let key = `position_${i + 1}`;
                                let driverId = this.props.site.race.result[key].driver;
                                let driver = {};

                                this.props.site.teamsDrivers.forEach((element) => {                                     
                                    if(element.driver_1.id === driverId) {
                                        driver = {
                                            id: element.driver_1.id,
                                            firstName: element.driver_1.firstName,
                                            lastName: element.driver_1.lastName,
                                            teamOfficialName: element.officialName,
                                            teamShortName: element.shortName,
                                            teamColor: element.teamColor
                                        };                                        
                                    }
                                    if(element.driver_2.id === driverId) {
                                        driver = {
                                            id: element.driver_2.id,
                                            firstName: element.driver_2.firstName,
                                            lastName: element.driver_2.lastName,
                                            teamOfficialName: element.officialName,
                                            teamShortName: element.shortName,
                                            teamColor: element.teamColor
                                        };                                        
                                    }                                 

                                    this.props.site.race.result[key].driver = driver;
                                });
                            });

                            let results = [];
                            for(let key in this.props.site.race.result) {
                                if(/position_/i.test(key)) {
                                    results.push(this.props.site.race.result[key]);
                                }                                
                            }
                            this.props.site.race.result = results;

                            setTimeout(() => {
                                this.setState({
                                    loading: false
                                });
                            }, 1000);
                        });
                    } else {
                        setTimeout(() => {
                            this.setState({
                                loading: false
                            });
                        }, 1000);
                    }
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
    }
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(CalendarDetailIndex);