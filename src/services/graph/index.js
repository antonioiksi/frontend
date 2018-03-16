import axios from 'axios';
import {validToken} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import store from '../../store';
import {verifyToken} from "../session";
import * as alarmActions from "../alarms/actions";

export function graph_data_remove_item(graph_id, item_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/remove-data-from-graph/'+graph_id+"/"+item_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
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

export function edge_remove_all(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/edge/remove-all/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                edges: response.data,
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

export function edge_add(graph_id, relation_names, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/edge/add/'+graph_id+'/', relation_names, config)
        .then((response) => {
            sender.setState({
                loading: false,
                edges: sender.state.edges.concat(response.data),
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

export function edge_list(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/edge/list/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                edges: response.data,
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


export function node_remove_all(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/node/remove-all/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                nodes: response.data,
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

export function node_add(graph_id, model_names_array, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/node/add/'+graph_id+'/', model_names_array, config)
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

export function node_list(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/node/list/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                nodes: response.data,
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


export function model_list(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/model/for-graph/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                model_list: response.data,
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


export function relation_list(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/relation/for-graph/'+graph_id, config)
        .then((response) => {
            sender.setState({
                loading: false,
                relation_list: response.data,
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
                message: JSON.stringify(response.data),
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

            axios.get(BUSINESS_SERVER_URL+'/graph/graph/', config)
                .then((response) => {
                    sender.setState({
                        loading: false,
                        graph_list: response.data,
                    });
                }).catch(( thrown ) => {
                    let messages = [];
                    messages.push(JSON.stringify(thrown));
                    store.dispatch(alarmActions.update(messages));
                    sender.setState({
                        loading: false,
                    });
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

export function drawing_list( sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/drawing/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                drawing_list: response.data,
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


export function model_create(model_data, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/model/', model_data, config)
        .then((response) => {
            sender.setState({
                loading: false,
                model_list: response.data,
            });
        })
        .catch( ( thrown ) => {
            let messages = [];
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
            sender.setState({
                loading: false,
                error: JSON.stringify(thrown)
            });
        });
}


export function relation_create(relation_data, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/relation/', relation_data, config)
        .then((response) => {
            sender.setState({
                loading: false,
                relation_list: response.data,
            });
        })
        .catch( ( thrown ) => {
            let messages = [];
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
            sender.setState({
                loading: false,
                error: JSON.stringify(thrown)
            });
        });
}


export function load_graph_data(graph_name, data_json, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/graph/load-data/'+graph_name, data_json, config)
        .then((response) => {
            sender.setState({
                loading: false,
                message: response.data,
            });
        })
        .catch( ( thrown ) => {
            let messages = [];
            messages.push(JSON.stringify(thrown));
            store.dispatch(alarmActions.update(messages));
            sender.setState({
                loading: false,
                error: JSON.stringify(thrown)
            });
        });
}




