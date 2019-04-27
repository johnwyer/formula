import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { getTracks, deleteTrack } from '../../../../actions/admin/track_actions';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LoadingIndicator from '../../../utils/loading-indicator';
import AdminTracksList from './list';
import NoItems from '../../../utils/no-items';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminTracksIndex extends Component {
    state = {
        loading: true,
        confirming: false,
        removing: false,
        trackId: null
    };

    _breadcrumbsLinks = [{
        title: 'Add Track',
        linkTo: '/admin/tracks/add'
    }];

    componentDidMount(){
        this.props.dispatch(getTracks()).then(() => {
            this.props.track.tracks.map((item) => {
                item.trackConfiguration = (item.trackConfiguration.length > 0) ? item.trackConfiguration[0].url : '';
                return item;
            });
            
            setTimeout(()=>{
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };    

    editHandler = (id) => {
        this.props.history.push(`/admin/tracks/edit/${id}`);
    };

    deleteHandler = () => {
        this.setState({
            removing: true,
            confirming: false
        }, () => {
            setTimeout(() => {               
                this.props.dispatch(deleteTrack(this.state.trackId)).then(() => {
                    this.setState({
                        removing: false,
                        trackId: null
                    }); 
                });
            }, 1000);
        });
    };  

    confirmHandler = (id) => {
        this.setState({
            confirming: true,
            trackId: id
        });
    };

    cancelHandler = () => {
        this.setState({
            confirming: false,
            trackId: null
        });        
    };     

    renderContent = () => {
        const list = (this.props.track.tracks && this.props.track.tracks.length) ? 
                <AdminTracksList 
                    tracks={this.props.track.tracks}
                    confirmHandler={(id) => this.confirmHandler(id)}
                    editHandler={(id) => this.editHandler(id)} 
                /> 
            : 
                <NoItems text="No Tracks" />;
        return (            
            <React.Fragment>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                { list }
            </React.Fragment>
        );
    };    

    render() {        
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
                
                <Dialog open={this.state.removing} PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' }}} aria-labelledby="simple-dialog">
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
                            Delete track <b>#{this.state.trackId}?</b>
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
        track: state.track
    };
};

export default connect(mapStateToProps)(AdminTracksIndex);