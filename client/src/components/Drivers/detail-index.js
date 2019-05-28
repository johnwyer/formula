import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getDriverBySlug } from '../../actions/site/driver_actions';
import DriverDetailList from './detail-list';

import { connect } from 'react-redux';

class DriversDetailIndex extends Component {
    state = {
        loading: true,
        error: false,
        errorMessage: ''        
    };

    componentDidMount(){
        this.getData();
    };

    getData = async () => {
        const driverSlug = this.props.match.params.slug;
        if(driverSlug !== undefined){
            this.setState({
                loading: true,
                error: false,
                errorMessage: ''
            });

            try {
                await this.props.dispatch(getDriverBySlug(driverSlug));

                if (!this.props.site.driver) {
                    this.props.history.push('/drivers');    
                } else {
                    setTimeout(() => {
                        this.setState({
                            loading: false
                        });
                    }, 1000);                    
                }                
            } catch (error) {
                this.setState({
                    loading: false,
                    error: true,
                    errorMessage: String(error)
                });
            }            
        } else {
            this.props.history.push('/drivers');
        }
    };

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? <DriverDetailList driver={this.props.site.driver[0]} /> : null;     

        return (
            <SiteLayout classes="drivers-detail-page">
                <React.Fragment>
                    { errorIndicator }
                    { spinner }
                    { content }
                </React.Fragment>               
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