import jwt_decode from 'jwt-decode';

import store from '../../store';

import * as api from './api';
import * as sessionActions from './actions';
import { initialState } from './reducer';

import * as alarmActions from '../alarms/actions';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

// create scheduler to refresh token
const setSessionTimeout = (duration) => {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(
        refreshToken, // eslint-disable-line no-use-before-define
        (duration - SESSION_TIMEOUT_THRESHOLD) * 1000
    );
};


const clearSession = () => {
    clearTimeout(sessionTimeout);
    store.dispatch(sessionActions.update(initialState));
};


const onRequestSuccess = (response) => {
    let decoded_access = jwt_decode(response.data.access);
    let durationSec = decoded_access.exp - Date.now()/1000;

    let tokens = {
        access: {
            value: response.data.access,
            //type: decoded_access.token_type,
            expiresIn: durationSec,
        },
        refresh: { value: response.data.refresh }
    }
    if(response.data.hasOwnProperty('refresh'))
    {
        let decoded_refresh = jwt_decode(response.data.refresh);
        tokens = {...tokens,
            refresh: {
                value: response.data.refresh
            }
        }
    }
    store.dispatch(sessionActions.update({ tokens, user: {id:decoded_access.user_id} }));
    //setSessionTimeout(durationSec);
};


const onRequestFailed = (exception) => {
    //let non_field_errors = response.data.non_field_errors;
    const data = exception.response.data;
    //console.log(errors);
    //store.dispatch( actionCreators.fail(errors));
    let messages = []
    Object.keys(data).map((item, i) => {
        //console.log(JSON.stringify(data[item]));
        messages.push(JSON.stringify(item) + ' ' + data[item][0]);
        //item[0]
    });

    //sender.setState({error: 'error'});
    store.dispatch(alarmActions.update(messages));
    clearSession();
    throw exception;
};


export const login = (username, password) =>
    api.obtain(username, password)
        .then(onRequestSuccess)
        .catch(onRequestFailed);


export const refreshToken = () => {
    const session = store.getState().session;

    if (!session.tokens.refresh.value) {
        return Promise.reject();
    }

    return api.refresh(session.tokens.refresh)
        .then(onRequestSuccess)
        .catch(onRequestFailed);
};

export const verifyToken = () => {
    const session = store.getState().session;

    if (!session.tokens.access.value) {
        return Promise.reject();
    }

    return api.verify(session.tokens.access.value)
        .then((response)=> console.log('verified!'))
        .catch((error) => {
            const messages = [];
            messages.push(JSON.stringify(error.response.data));
            store.dispatch(alarmActions.update(messages));
            clearSession();
            throw error;
        });
};


export const logout = () => {
    clearSession();
    store.dispatch(alarmActions.update([]));
    //TODO add revoking tokens on server side
    /*
    return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
        type: session.tokens[tokenKey].type,
        value: session.tokens[tokenKey].value,
    })))
        .then(clearSession())
        .catch(() => {});*/
};
