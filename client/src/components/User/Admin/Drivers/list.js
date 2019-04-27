import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DriverIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        flexGrow: 1
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px`,
    },
});

class AdminDriversList extends Component {
    
    renderAvatar = (driverImageUrl = '') => (
        (driverImageUrl.length !== '') ? <Avatar src={driverImageUrl} /> : <Avatar><DriverIcon /></Avatar>
    );    

    render(){
        const { classes, drivers, editHandler, confirmHandler } = this.props;      

        return (
            <Grid item xs={12} md={12}>
                <Typography variant="h6" className={classes.title}>Drivers List</Typography>
                <div className={classes.demo}>                    
                    <List dense={false}>
                        {
                            drivers.map((item, i) => (
                                <React.Fragment key={item.id}>
                                    { i === 0 ? <Divider /> : null }
                                    <ListItem>
                                        <ListItemAvatar>
                                            { this.renderAvatar(item.driverImageUrl) }
                                        </ListItemAvatar>                                        
                                        <ListItemText
                                            primary={`${item.name}`}
                                        />                                        
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Edit" onClick={() => editHandler(item.id)}>
                                                <EditIcon />
                                            </IconButton>                                    
                                            <IconButton aria-label="Delete" onClick={() => confirmHandler(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>                                    
                                    </ListItem>                   
                                    <Divider />     
                                </React.Fragment>
                            ))
                        }
                    </List>
                </div>
            </Grid>
        )
    }
};

AdminDriversList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminDriversList);