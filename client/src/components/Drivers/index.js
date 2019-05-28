import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
import LoadingIndicator from '../utils/loading-indicator';
import ErrorIndicator from '../utils/error-indicator';

import { getDrivers } from '../../actions/site/driver_actions';
import { getDriverStandings } from '../../actions/site/result_actions';
import DriversIndexList from './drivers-list';
import DriversIndexStandingsList from './standings';

import { connect } from 'react-redux';

class DriversIndex extends Component {
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
            await this.props.dispatch(getDrivers());
            await this.props.dispatch(getDriverStandings());

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

    renderContent = () => (
        <div className="drivers-page-inner">
            <DriversIndexStandingsList drivers={this.props.site.driverStandings} />
            <DriversIndexList drivers={this.props.site.drivers} />
        </div>
    );

    render() {
        const { loading, error, errorMessage } = this.state;
        const hasData = !(loading || error);
        const errorIndicator = error ? <ErrorIndicator message={errorMessage} reloadHandler={() => this.getData()} /> : null;
        const spinner = loading ? <LoadingIndicator /> : null;
        const content = hasData ? this.renderContent() : null;

        return (
            <SiteLayout classes="drivers-page">
                <h2 className="page-title">Formula 1&reg; Drivers</h2>                
                <React.Fragment>
                    { errorIndicator }
                    { spinner }
                    { content }
                </React.Fragment>
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