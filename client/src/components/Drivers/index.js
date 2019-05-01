import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';

import { getDrivers } from '../../actions/site/site_actions';
import DriversIndexList from './drivers-list';

import { connect } from 'react-redux';

class DriversIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        this.props.dispatch(getDrivers()).then(() => {
            this.props.site.drivers.map((item) => {
                item.driverImage = (item.driverImage.length > 0) ? item.driverImage[0].url : '';
                item.team = (item.team_1.length > 0) ? item.team_1[0] : item.team_2[0];
                delete item.team_1;
                delete item.team_2;

                return item;                
            });
                
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    render() {
        return (
            <SiteLayout classes="drivers-page">
                <h2 className="page-title">Formula 1&reg; Drivers</h2>
                <div className="drivers-list clearfix">
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <DriversIndexList drivers={this.props.site.drivers} />
                    )                    
                }  
                </div>
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