import axios from 'axios';
import {validToken} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import store from '../../store';
import {verifyToken} from "../session";
import * as alarmActions from "../alarms/actions";



export function objects_by_name( object, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/data-by-object-name/'+object, config)
        .then((response) => {
            sender.setState({
                loading: false,
                [object]: response.data,
            });
        })
        .catch( ( thrown ) => {
            let messages = [];
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
            sender.setState({
                loading: false,
            });
        });
}

export function graph_object_list( sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/object/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_object: response.data,
            });
        })
        .catch( ( thrown ) => {
            let messages = [];
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
            sender.setState({
                loading: false,
            });
        });
}