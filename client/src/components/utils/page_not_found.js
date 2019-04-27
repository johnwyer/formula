import React from 'react';


const PageNotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center page-not-found">
            <h1>404</h1>
            <h3 className="text-uppercase">Page Not Found!</h3>
            <p className="text-muted">YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
            <a href="/" className="btn btn-info btn-rounded waves-effect waves-light">Back to home</a>
        </div>
    );
};

export default PageNotFound;