import store from '../../store';
import {verifyToken} from "../session";
import axios from 'axios';
import * as settingsActions from './actions';
import {BUSINESS_SERVER_URL} from "../constants";
import * as alarmActions from "../alarms/actions";
import {ITEM_STATUS} from "../../scenes/Settings/components/SettingsItem";

export function load_settings( )
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;


    let source = axios.CancelToken.source();
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        cancelToken: source.token,
        //cancelToken: cancelToken,
        timeout: 300 * 1000, //number millisec, = 5 min
    }


    axios.get(BUSINESS_SERVER_URL+'/elastic/settings/list/', config)
        .then((response) => {
            let data = response.data;
            store.dispatch(settingsActions.load(data));
        })
        .catch( ( thrown ) => {
            let messages = []
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
        });
    return source;
}


export function reset_setting(setting_name, sender)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;


    let source = axios.CancelToken.source();
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        cancelToken: source.token,
        //cancelToken: cancelToken,
        timeout: 300 * 1000, //number millisec, = 5 min
    }


    axios.get(BUSINESS_SERVER_URL+'/elastic/settings/reset/'+setting_name, config)
        .then(response => {
            let data = response.data;
            sender.setState({
                value: JSON.stringify(data.setting, undefined, 4)
            })


            axios.get(BUSINESS_SERVER_URL+'/elastic/settings/list/', config)
                .then(response => {
                    let data = response.data;
                    store.dispatch(settingsActions.load(data));
                    sender.setState({
                        status: ITEM_STATUS.UPDATED,
                    })
                })
                .catch( ( thrown ) => {
                    let messages = []
                    messages.push(JSON.stringify(thrown));
                    store.dispatch(alarmActions.update(messages));
                });
        })
        .catch( ( thrown ) => {
            let messages = []
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
        });
    return source;
}


export function update_setting(setting_name, value, sender)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;


    let source = axios.CancelToken.source();
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        cancelToken: source.token,
        //cancelToken: cancelToken,
        timeout: 300 * 1000, //number millisec, = 5 min
    }

    axios.post(BUSINESS_SERVER_URL+'/elastic/settings/update-setting/'+setting_name, value, config)
        .then(response => {
            axios.get(BUSINESS_SERVER_URL+'/elastic/settings/list/', config)
                .then(response => {
                    let data = response.data;
                    store.dispatch(settingsActions.load(data));
                    sender.setState({
                        status: ITEM_STATUS.UPDATED
                    })
                })
                .catch( ( thrown ) => {
                    let messages = []
                    messages.push(JSON.stringify(thrown));
                    store.dispatch(alarmActions.update(messages));
                });
        })
        .catch( ( thrown ) => {
            let messages = []
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
        });
    return source;
}
