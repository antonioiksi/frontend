import axios from 'axios';
import {validToken} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import store from '../../store';
import {verifyToken} from "../session";
import * as alarmActions from "../alarms/actions";
import * as alertsActions from "../alerts/actions";

export function graph_data_list(graph_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/graph/data/list/'+graph_id, config)
        .then((response) => {
            sender.setState({
                graph_data: response.data,
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
                //edges: sender.state.edges.concat(response.data),
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
        .catch( ( err ) => {
            console.log(err.message)
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
                //nodes: sender.state.nodes.concat(response.data),
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

    const url = BUSINESS_SERVER_URL+'/graph/model/for-graph/'+graph_id
    axios.get( url, config)
        .then((response) => {
            sender.setState({
                loading: false,
                model_list: response.data,
            });
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Модели для графа загружены"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка получения моделей для графа " + graph_id + " " + err.message + " url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/relation/for-graph/'+graph_id
    axios.get( url, config)
        .then((response) => {
            sender.setState({
                loading: false,
                relation_list: response.data,
            });
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Связи для графа загружены"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка загрузки связей для графа " + graph_id + " " + err.message + " url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/graph/'
    axios.get(BUSINESS_SERVER_URL+'/graph/graph/', config)
        .then((response) => {
            sender.setState({
                loading: false,
                graph_list: response.data,
            });
        })
        .catch( ( thrown ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка получения графов url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/clear/'+graph_pk
    axios.get(url, config)
        .then((response) => {
            graph_list(sender);
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Данные со схемы успешно удалены"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка удаления данных со схемы url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/graph/'+graph_pk
    axios.delete(url, config)
        .then((response) => {
            graph_list(sender);
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Схема данных успешно удалена"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка удаления схемы данных url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/graph/'
    axios.post( url, graph_data, config)
        .then((response) => {
            graph_list(sender);
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Схема данных успешно добавлена"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка создания схемы данных url:" + url,
            }));
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

    const url = BUSINESS_SERVER_URL+'/graph/drawing/'
    axios.get( url, config)
        .then((response) => {
            sender.setState({
                loading: false,
                drawing_list: response.data,
            });
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка загрузки типов отображения моделей url:" + url,
            }));
        });
}


export function model_create( graph_id, model_data, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const url =  BUSINESS_SERVER_URL+'/graph/model/'
    axios.post( url, model_data, config)
        .then((response) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Модель успешно добавлена"
            }));
            model_list(graph_id, sender)
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка созданния модели " + err.message + " url:" + url,
            }));
        });
}

export function model_delete( graph_id, model_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const url = BUSINESS_SERVER_URL+'/graph/model/' + model_id
    axios.delete( url, config)
        .then((response) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Модель успешно удалена"
            }));
            model_list(graph_id, sender)
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка удаления модели url:" + url,
            }));
        });
}


export function relation_create(graph_id, relation_data, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const url = BUSINESS_SERVER_URL+'/graph/relation/'
    axios.post( url, relation_data, config)
        .then((response) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Связь успешно добавлена"
            }));
            relation_list(graph_id, sender)
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка созданния связи " + err.message + " url:" + url,
            }));
        });
}

export function relation_delete( graph_id, relation_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const url = BUSINESS_SERVER_URL+'/graph/relation/' + relation_id
    axios.delete( url, config)
        .then((response) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Связь успешно удалена"
            }));
            relation_list(graph_id, sender)
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка удаления связи url:" + url + " err:" + err.message,
            }));
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




