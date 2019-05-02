import React, { Component } from 'react';
import SiteLayout from '../../hoc/site';

import { connect } from 'react-redux';

class ResultsIndex extends Component {
    state = {
        loading: true
    };

    componentDidMount() {

    };

    render() {
        return (
            <SiteLayout>
                Results
            </SiteLayout>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        site: state.site
    };
};

export default connect(mapStateToProps)(ResultsIndex);