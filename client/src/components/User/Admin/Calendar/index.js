import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { getRaces, deleteRace } from '../../../../actions/admin/calendar_actions';

//import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
//import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoadingIndicator from '../../../utils/loading-indicator';
import AdminCalendarList from './list';
import NoItems from '../../../utils/no-items';
import Breadcrumbs from '../../../utils/breadcrumbs';

import { connect } from 'react-redux';

class AdminCalendarIndex extends Component {
    state = {
        loading: true,
        removing: false
    };

    _breadcrumbsLinks = [{
        title: 'Add Race',
        linkTo: '/admin/calendar/add'
    }];    

    componentDidMount(){
        this.props.dispatch(getRaces()).then(() => {
            setTimeout(()=>{
                this.setState({
                    loading: false
                });
            }, 2000);
        });
    };   
    
    editHandler = (id) => {
        this.props.history.push(`/admin/calendar/edit/${id}`);
    };  
    
    deleteHandler = (id) => {
        this.setState({
            removing: true
        }, () => {
            setTimeout(()=>{
                this.props.dispatch(deleteRace(id)).then(() => {
                    this.setState({
                        removing: false
                    });
                });
            }, 1000);
        });
    };

    renderContent = () => {
        const list = (this.props.calendar.races && this.props.calendar.races.length) ? 
                <AdminCalendarList 
                    races={this.props.calendar.races}
                    deleteHandler={(id) => this.deleteHandler(id)}
                    editHandler={(id) => this.editHandler(id)} 
                /> 
            : 
                <NoItems text="No races" />
        return (            
            <React.Fragment>
                <Breadcrumbs links={this._breadcrumbsLinks} />
                { list }
            </React.Fragment>
        )
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
                    open={this.state.removing} 
                    PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', overflow: 'hidden' }}} 
                    aria-labelledby="simple-dialog">
                    <CircularProgress />
                </Dialog>
            </UserLayout>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        calendar: state.calendar
    };
};

export default connect(mapStateToProps)(AdminCalendarIndex);