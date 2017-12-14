import axios from 'axios';
import {validToken} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import store from '../../store';
import {verifyToken} from "../session";
import * as alarmActions from "../alarms/actions";



export function graph_nodes_by_models(graph_name, model_names_array, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/node/get/'+graph_name+'/', model_names_array, config)
        .then((response) => {
            sender.setState({
                loading: false,
                nodes: sender.state.nodes.concat(response.data),
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

export function graph_model_list( sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/model/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_model: response.data,
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


export function graph_relation_list( sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/relation/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_relation: response.data,
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



export function graph_list( sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/graph/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_list: response.data,
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


export function graph_clear(graph_pk, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/clear/'+graph_pk, config)
        .then((response) => {
            sender.setState({
                loading: false,
                message: 'ok'
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


export function graph_remove(graph_pk, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.delete(BUSINESS_SERVER_URL+'/graph/graph/'+graph_pk, config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_list: response.data,
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

export function graph_create(graph_data, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/graph/', graph_data, config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_list: response.data,
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

