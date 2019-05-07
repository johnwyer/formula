import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/layout';
import Auth from './hoc/auth';

import Home from './components/Home';

import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import ResetUser from './components/Reset_user';

import TeamsIndex from './components/Teams';
import TeamsDetailIndex from './components/Teams/detail-index';
import CalendarIndex from './components/Calendar';
import CalendarDetailIndex from './components/Calendar/detail-index.js';
import DriversIndex from './components/Drivers';
import DriversDetailIndex from './components/Drivers/detail-index.js';
import ResultsIndex from './components/Results';

import UserDashboard from './components/User';
import AdminDriversIndex from './components/User/Admin/Drivers';
import AdminAddEditDriver from './components/User/Admin/Drivers/add-edit';
import AdminCalendarIndex from './components/User/Admin/Calendar';
import AdminAddEditCalendar from './components/User/Admin/Calendar/add-edit';
import AdminTeamsIndex from './components/User/Admin/Teams';
import AdminAddEditTeam from './components/User/Admin/Teams/add-edit';
import AdminTracksIndex from './components/User/Admin/Tracks';
import AdminAddEditTrack from './components/User/Admin/Tracks/add-edit';
import AdminResultsIndex from './components/User/Admin/Results';
import AdminAddEditResult from './components/User/Admin/Results/add-edit';

import PageNotFound from './components/utils/page_not_found';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/admin/results/edit/:id" exact component={Auth(AdminAddEditResult, true)} />
                <Route path="/admin/results/add/:id" exact component={Auth(AdminAddEditResult, true)} />
                <Route path="/admin/results" exact component={Auth(AdminResultsIndex, true)} />

                <Route path="/admin/tracks/edit/:id" exact component={Auth(AdminAddEditTrack, true)} />
                <Route path="/admin/tracks/add" exact component={Auth(AdminAddEditTrack, true)} />
                <Route path="/admin/tracks" exact component={Auth(AdminTracksIndex, true)} />

                <Route path="/admin/teams/edit/:id" exact component={Auth(AdminAddEditTeam, true)} />
                <Route path="/admin/teams/add" exact component={Auth(AdminAddEditTeam, true)} />
                <Route path="/admin/teams" exact component={Auth(AdminTeamsIndex, true)} />     

                <Route path="/admin/calendar/edit/:id" exact component={Auth(AdminAddEditCalendar, true)} />
                <Route path="/admin/calendar/add" exact component={Auth(AdminAddEditCalendar, true)} />
                <Route path="/admin/calendar" exact component={Auth(AdminCalendarIndex, true)} />       
                     
                <Route path="/admin/drivers/edit/:id" exact component={Auth(AdminAddEditDriver, true)} />
                <Route path="/admin/drivers/add" exact component={Auth(AdminAddEditDriver, true)} />
                <Route path="/admin/drivers" exact component={Auth(AdminDriversIndex, true)} />                

                <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
                <Route path="/reset-user" exact component={Auth(ResetUser, false)} />
                <Route path="/register" exact component={Auth(Register, false)} />
                <Route path="/register-login" exact component={Auth(RegisterLogin, false)} />

                <Route path="/teams/:slug" exact component={Auth(TeamsDetailIndex, null)} />
                <Route path="/teams" exact component={Auth(TeamsIndex, null)} />

                <Route path="/calendar/:slug" exact component={Auth(CalendarDetailIndex, null)} />
                <Route path="/calendar" exact component={Auth(CalendarIndex, null)} />

                <Route path="/drivers/:slug" exact component={Auth(DriversDetailIndex, null)} />
                <Route path="/drivers" exact component={Auth(DriversIndex, null)} />

                <Route path="/results" exact component={Auth(ResultsIndex, null)} />

                <Route path="/" exact component={Auth(Home, null)} />
                
                <Route component={Auth(PageNotFound)} />   
            </Switch>
        </Layout>
    );
};

export default Routes;