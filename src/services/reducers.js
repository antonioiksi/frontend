import { combineReducers } from 'redux';

// Reducers
import { reducer as sessionReducer } from './session/reducer';
import { reducer as alarmsReducer } from './alarms/reducer';
import { reducer as businessReducer } from './business/reducer';
import { reducer as settingsReduser } from './settings/reducer';
import { reducer as alertsReduser } from './alerts/reducer';
//import logReducer from './log-reducer';
//import userReducer from './user-reducer';

// Combine Reducers
const reducers = combineReducers({
    session: sessionReducer,
    alarms: alarmsReducer,
    business: businessReducer,
    settings: settingsReduser,
    alerts: alertsReduser,
});

export default reducers;
