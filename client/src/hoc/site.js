import React from 'react';
import { connect } from 'react-redux';

const SiteLayout = (props) => {
    const classes = props.classes !== undefined ? props.classes : '';
    return ( 
        <div className={`container-fluid ${classes}`}>
            <div className="site-page">
                { props.children }
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        //site: state.site
    };
};

export default connect(mapStateToProps)(SiteLayout);