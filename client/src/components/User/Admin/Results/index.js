import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { getResults, deleteResult } from '../../../../actions/admin/result_actions';

import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import LoadingIndicator from '../../../utils/loading-indicator';
import AdminResultsList from './list';
import NoItems from '../../../utils/no-items';

import { connect } from 'react-redux';

class AdminResultIndex extends Component {
    state = {
        loading: true,
        confirming: false,
        removing: false,
        resultId: null
    };

    componentDidMount(){
        this.props.dispatch(getResults()).then(() => {
            //console.log('Results list', this.props.result.results);
            setTimeout(()=>{
                this.setState({
                    loading: false
                });
            }, 1000);
        });
    };

    editHandler = (id) => {
        this.props.history.push(`/admin/results/edit/${id}`);
    };

    addHandler = (id) => {
        this.props.history.push(`/admin/results/add/${id}`);
    };

    deleteHandler = () => {
        console.log('delete', this.state.resultId);        
        this.setState({
            removing: true,
            confirming: false
        }, () => {
            setTimeout(() => {               
                this.props.dispatch(deleteResult({id: this.state.resultId})).then(() => {
                    this.setState({
                        removing: false,
                        resultId: null
                    });
                });
            }, 1000);
        });
    };

    confirmHandler = (id) => {
        this.setState({
            confirming: true,
            resultId: id
        });
    };

    cancelHandler = () => {
        console.log('cancel');
        this.setState({
            confirming: false,
            resultId: null
        });        
    };  

    renderContent = () => {
        const list = (this.props.result.results && this.props.result.results.length) ? 
                <AdminResultsList 
                    results={this.props.result.results}
                    confirmHandler={(id) => this.confirmHandler(id)}
                    editHandler={(id) => this.editHandler(id)} 
                    addHandler={(id) => this.addHandler(id)} 
                /> 
            : 
                <NoItems text="No Races" />;
        return (            
            <React.Fragment>
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
                            Delete race results id <b>#{this.state.resultId}?</b>
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
        result: state.result
    };
};

export default connect(mapStateToProps)(AdminResultIndex);