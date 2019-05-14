import { combineReducers } from 'redux';

//admin reducers
import user from './user_reducer';
import driver from './driver_reducer';
import calendar from './calendar_reducer';
import team from './team_reducer';
import track from './track_reducer';
import result from './result_reducer';

//site reducers
import site from './site_reducer';

const rootReducer = combineReducers({
    user,
    driver,
    calendar,
    team,
    track,
    result,
    site
});

export default rootReducer;