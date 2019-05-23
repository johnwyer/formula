import React, { Component } from 'react'

export default class WrappedErrorIndicator extends Component {    
    render() {
        let { classes } = this.props;
        classes = classes === undefined ? null : classes;
        return (
            <div className={classes}>
                {this.props.children}
            </div>
        )
    }
};