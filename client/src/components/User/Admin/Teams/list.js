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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TeamIcon from '@material-ui/icons/TurnedIn';
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

class AdminTeamsList extends Component {

    renderAvatar = (teamLogo) => (
        (teamLogo.length !== '') ? <Avatar src={teamLogo} /> : <Avatar><TeamIcon /></Avatar>
    );

    render(){
        const { classes, teams, editHandler, confirmHandler } = this.props;           

        return (
            <Grid item xs={12} md={12}>
                <Typography variant="h6" className={classes.title}>Teams List</Typography>
                <div className={classes.demo}>                    
                    <List dense={false}>
                        {
                            teams.map((item, i) => (
                                <React.Fragment key={item.id}>
                                    { i === 0 ? <Divider /> : null }
                                    <ListItem>
                                        <ListItemAvatar>
                                            { this.renderAvatar(item.teamLogo) }
                                        </ListItemAvatar>                                        
                                        <ListItemText
                                            primary={`${item.officialName}`}
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

AdminTeamsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminTeamsList);