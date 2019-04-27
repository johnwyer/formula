import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingIndicator = () => {
    return (
        <div className="d-flex justify-content-center">
            <CircularProgress />
        </div>
    );
};

export default LoadingIndicator;