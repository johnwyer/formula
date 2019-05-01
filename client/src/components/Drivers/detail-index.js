import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';
//import LoadingIndicator from '../utils/loading-indicator';

import { connect } from 'react-redux';

class DriversDetailIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount(){
        const driverSlug = this.props.match.params.slug;
    };

    render() {
        return (
            <SiteLayout classes="drivers-detail-page">
                { this.props.match.params.slug }

            </SiteLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(DriversDetailIndex);