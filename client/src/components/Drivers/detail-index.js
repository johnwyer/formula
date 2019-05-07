import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import { getDriverBySlug } from '../../actions/site/driver_actions';
import DriverDetailList from './detail-list';

import { connect } from 'react-redux';

class DriversDetailIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        const driverSlug = this.props.match.params.slug;
        if(driverSlug !== undefined){
            this.props.dispatch(getDriverBySlug(driverSlug)).then(() => {
                if (!this.props.site.driver) {
                    this.props.history.push('/drivers');    
                } else {
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);                    
                }
            });
        } else {
            this.props.history.push('/drivers');
        }
    };

    render() {
        return (
            <SiteLayout classes="drivers-detail-page">
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        <DriverDetailList driver={this.props.site.driver[0]} />
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

export default connect(mapStateToProps)(DriversDetailIndex);