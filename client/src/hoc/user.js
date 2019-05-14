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
import InfoIcon from '@material-ui/icons/Info';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import LooksThreeIcon from '@material-ui/icons/Looks3';
import LooksFourthIcon from '@material-ui/icons/Looks4';
import LooksFiveIcon from '@material-ui/icons/Looks5';


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

const adminLinks = [{
        name: 'Site info',
        linkTo: '/admin/site-info',
        iconComponent: InfoIcon
    },
    {
        name: 'Drivers',
        linkTo: '/admin/drivers',
        iconComponent: LooksOneIcon
    },
    {
        name: 'Teams',
        linkTo: '/admin/teams',
        iconComponent: LooksTwoIcon
    },
    {
        name: 'Tracks',
        linkTo: '/admin/tracks',
        iconComponent: LooksThreeIcon
    },
    {
        name: 'Race Calendar',
        linkTo: '/admin/calendar',
        iconComponent: LooksFourthIcon
    },
    {
        name: 'Race Results',
        linkTo: '/admin/results',
        iconComponent: LooksFiveIcon
    }
];

const UserLayout = (props) => {
    const { classes } = props;

    const renderIcon = (Icon) => {
        return (
           <Icon />
        )
    };

    return ( 
        <div className="container-fluid admin-panel">
            <div className="d-flex">
                <Drawer 
                    className={classes.drawer}
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
                                adminLinks.map((item, index) => ( 
                                    <Link to={item.linkTo} key={index}>
                                        <ListItem button>
                                            <ListItemIcon>{renderIcon(item.iconComponent)}</ListItemIcon> 
                                            <ListItemText primary={item.name} />                                                     
                                        </ListItem>                              
                                    </Link>
                                ))
                            } 
                            </List> 
                        </React.Fragment> 
                        : null
                } 
                <Divider />

                </Drawer> 
                <div className={ classes.content }>{ props.children }</div>
            </div>
        </div>
    );
};

UserLayout.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(withStyles(styles)(UserLayout));