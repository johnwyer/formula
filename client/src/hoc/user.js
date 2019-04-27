import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


const drawerWidth = 240;
const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

const admin = [{
        name: 'Site info',
        linkTo: '/admin/site-info'
    },
    {
        name: 'Drivers',
        linkTo: '/admin/drivers'
    },
    {
        name: 'Teams',
        linkTo: '/admin/teams'
    },
    {
        name: 'Tracks',
        linkTo: '/admin/tracks'
    },
    {
        name: 'Race Calendar',
        linkTo: '/admin/calendar'
    },
    {
        name: 'Race Results',
        linkTo: '/admin/results'
    },        
];

const UserLayout = (props) => {
    const { classes } = props;

    return ( 
        <div className="container-fluid admin-panel">
            <div className="d-flex">
                <Drawer 
                    className={ classes.drawer }
                    variant="permanent"
                    classes={{paper: classes.drawerPaper}}
                >
                <div className={ classes.toolbar } style={{ minHeight: '70.5px' }} />
                { 
                    props.user.userData.isAdmin ?
                        <React.Fragment>
                            <h5 className="sidebar-title">Admin</h5> 
                            <List> 
                            {
                                admin.map((item, index) => ( 
                                    <Link to={ item.linkTo } key={ index }>
                                        <ListItem button>
                                            <ListItemIcon>{ index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }</ListItemIcon> 
                                            <ListItemText primary={ item.name } />                                                     
                                        </ListItem>                              
                                    </Link>
                                ))
                            } 
                            </List> 
                        </React.Fragment> 
                        : null
                } 
                <Divider />
                <h5 className="sidebar-title">Account info</h5>
                <List> 
                {
                    ['All mail', 'Trash', 'Spam'].map((text, index) => ( 
                        <ListItem button key={ text }>
                            <ListItemIcon>{ index % 2 === 0 ? <InboxIcon /> : <MailIcon /> }</ListItemIcon>
                            <ListItemText primary={ text } /> 
                        </ListItem>
                    ))
                } 
                </List> 
                </Drawer> 
                <div className={ classes.content }>{ props.children }</div>
            </div>
        </div>
    );
};

UserLayout.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(UserLayout));