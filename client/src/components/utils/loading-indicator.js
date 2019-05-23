import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = ({ classes }) => {
    const componentClasses = classes === undefined ? "d-flex justify-content-center loading-indicator" : `d-flex justify-content-center loading-indicator ${classes}`;
    return (
        <div className={componentClasses}>
            <CircularProgress />
        </div>
    );
};

export default LoadingIndicator;