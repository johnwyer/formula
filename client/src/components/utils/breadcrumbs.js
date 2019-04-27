import React from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({links}) => {      
    return (  
        links.length !== 0 ?
            <React.Fragment>
                <div className="admin-panel-nav">
                    {
                        links.map((item, i) => (
                            <Button variant="contained" component={Link} to={item.linkTo} key={i}>
                                {item.title}
                            </Button>
                        ))
                    }
                </div>          
                <Divider />
            </React.Fragment>    
        : null
    );
};

export default Breadcrumbs;