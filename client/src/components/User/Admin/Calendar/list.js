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
//import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RoomIcon from '@material-ui/icons/Room';
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

class AdminCalendarList extends Component {

    renderAvatar = (country = []) => (
        (country.length) ? <Avatar><RoomIcon /></Avatar> : <Avatar src={`/images/flags/${country.code.toLowerCase()}.png`} />
    );

    render(){
        const { classes, races, editHandler } = this.props;

        return (
            <Grid item xs={12} md={12}>
                <Typography variant="h6" className={classes.title}>Calendar List</Typography>
                <div className={classes.demo}>                    
                    <List dense={false}>
                        {
                            races.map((item, i) => (
                                <React.Fragment key={item.id}>
                                    { i === 0 ? <Divider /> : null }
                                    <ListItem>
                                        <ListItemAvatar>
                                            { this.renderAvatar(item.country) }
                                        </ListItemAvatar>                                        
                                        <ListItemText
                                            primary={`${item.fullName}`}
                                        />                                        
                                        <ListItemSecondaryAction>
                                            <IconButton aria-label="Edit" onClick={() => editHandler(item.id)}>
                                                <EditIcon />
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

AdminCalendarList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminCalendarList);