import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';

import { getDrivers } from '../../actions/site/driver_actions';
import { getDriverStandings } from '../../actions/site/result_actions';
import DriversIndexList from './drivers-list';
import DriversIndexStandingsList from './standings';

import { connect } from 'react-redux';

class DriversIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        this.props.dispatch(getDrivers()).then(() => {
            this.props.dispatch(getDriverStandings()).then(() => {      
                setTimeout(() => {
                    this.setState({
                        loading: false
                    });
                }, 1000);
            });
        });
    };

    render() {
        return (
            <SiteLayout classes="drivers-page">
                <h2 className="page-title">Formula 1&reg; Drivers</h2>                
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <div className="drivers-page-inner">
                            <DriversIndexStandingsList drivers={this.props.site.driverStandings} />
                            <DriversIndexList drivers={this.props.site.drivers} />
                        </div>
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

export default connect(mapStateToProps)(DriversIndex);