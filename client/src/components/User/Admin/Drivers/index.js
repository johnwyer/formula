import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { getDrivers, deleteDriver } from '../../../../actions/admin/driver_actions';

//import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LoadingIndicator from '../../../utils/loading-indicator';
import AdminDriversList from './list';
import NoItems from '../../../utils/no-items';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminDriversIndex extends Component {
    state = {
        loading: true,
        confirming: false,
        removing: false,
        driverId: null
    };

    _breadcrumbsLinks = [{
        title: 'Add Driver',
        linkTo: '/admin/drivers/add'
    }];      

    componentDidMount(){
        this.props.dispatch(getDrivers()).then(() => {
            this.props.driver.drivers.map((item) => {
                item.driverImageUrl = (item.driverImage.length > 0) ? item.driverImage[0].url : '';
                return item;
            });
            
            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    editHandler = (id) => {
        this.props.history.push(`/admin/drivers/edit/${id}`);
    };
    
    deleteHandler = (id) => {
        this.setState({
            removing: true,
            confirming: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    removing: false,
                    driverId: null
                });                
                this.props.dispatch(deleteDriver(id)).then(() => {
                    this.setState({
                        removing: false,
                        driverId: null
                    });  
                });
            }, 1000);
        });
    };

    confirmHandler = (id) => {
        this.setState({
            confirming: true,
            driverId: id
        });
    };

    cancelHandler = () => {
        this.setState({
            confirming: false,
            driverId: null
        });        
    };     

    renderContent = () => {
        const list = (this.props.driver.drivers && this.props.driver.drivers.length) ? 
                <AdminDriversList 
                    drivers={this.props.driver.drivers}
                    confirmHandler={(id) => this.confirmHandler(id)}
                    editHandler={(id) => this.editHandler(id)} 
                /> 
            : 
                <NoItems text="No drivers" />;
        return (            
            <React.Fragment>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                { list }
            </React.Fragment>
        );
    };

    render() {
        //console.log('props ', this.props);

        return (
            <UserLayout>
                {
                    this.state.loading ? 
                    (
                        <LoadingIndicator />
                    )
                    :
                    ( 
                        this.renderContent()
                    )                    
                }              
                
                <Dialog 
                    keepMounted
                    open={this.state.removing} 
                    PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' }}} 
                    aria-labelledby="simple-dialog"
                >
                    <CircularProgress />
                </Dialog>
                <Dialog
                    keepMounted
                    open={this.state.confirming}
                    onClose={this.cancelHandler}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Please confirm your action"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Delete driver <b>#{this.state.driverId}?</b>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.cancelHandler} color="primary" autoFocus>Cancel</Button>
                        <Button onClick={this.deleteHandler} color="primary">Delete</Button>
                    </DialogActions>
                </Dialog>                  
            </UserLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        driver: state.driver
    }
};

export default connect(mapStateToProps)(AdminDriversIndex);