import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { getTeams, deleteTeam } from '../../../../actions/admin/team_actions';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LoadingIndicator from '../../../utils/loading-indicator';
import AdminTeamsList from './list';
import NoItems from '../../../utils/no-items';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminTeamsIndex extends Component {
    state = {
        loading: true,
        confirming: false,
        removing: false,
        teamId: null
    };

    _breadcrumbsLinks = [{
        title: 'Add Team',
        linkTo: '/admin/teams/add'
    }];    

    componentDidMount(){
        this.props.dispatch(getTeams()).then(() => {
            this.props.team.teams.map((item) => {
                item.teamLogo = (item.teamLogo.length > 0) ? item.teamLogo[0].url : '';
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
        this.props.history.push(`/admin/teams/edit/${id}`);
    };
    
    deleteHandler = () => {
        this.setState({
            removing: true,
            confirming: false
        }, () => {
            setTimeout(() => {             
                this.props.dispatch(deleteTeam(this.state.teamId)).then(() => {
                    this.setState({
                        removing: false,
                        teamId: null
                    });
                });
            }, 1000);
        });
    };

    confirmHandler = (id) => {
        this.setState({
            confirming: true,
            teamId: id
        });
    };

    cancelHandler = () => {
        this.setState({
            confirming: false,
            teamId: null
        });        
    };       

    renderContent = () => {
        const list = (this.props.team.teams && this.props.team.teams.length) ? 
                <AdminTeamsList 
                    teams={this.props.team.teams}
                    confirmHandler={(id) => this.confirmHandler(id)}
                    editHandler={(id) => this.editHandler(id)} 
                />
            : 
                <NoItems text="No Teams" />;
        return (            
            <React.Fragment>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                { list }
            </React.Fragment>
        );
    };

    render() {
        console.log('props ', this.props);

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
                            Delete team <b>#{this.state.teamId}?</b>
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
        team: state.team
    }
};

export default connect(mapStateToProps)(AdminTeamsIndex);