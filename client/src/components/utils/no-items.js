import React from 'react';
import Typography from '@material-ui/core/Typography';

const NoItems = ({text = 'No items'}) => {
    return (
        <Typography paragraph={true} align="center">{text}</Typography>
    );
};

export default NoItems;