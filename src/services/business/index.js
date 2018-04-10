import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import * as businessActions from '../business/actions';
import * as alarmsActions from '../alarms/actions';
import store from '../../store';
import {verifyToken} from "../session";
import * as alertsActions from "../alerts/actions";
import _ from 'lodash';
import format from 'string-format';


const endPoints = {
    attributes: '/attribute/list/',
    entity_attribute: '/attribute/list-entity-attribute/',

    user_bins: '/bin/list/',
    bin_activate: '/bin/activate/',
    bin_items: '/bin/item/list/',
    item: '/bin/item/',
    bin_reset: '/bin/reset/',
    item_delete: '/bin/item/delete/',

    query_templates: '/elastic/query-template/list/',
    bin_to_graph: '/bin-graph/load/',
};


export function attributes()
{
    axios.get(BUSINESS_SERVER_URL + endPoints.attributes)
        .then(({data}) => {
            store.dispatch(businessActions.attributes(data));
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
        });
}

export function entity_attributes()
{
    axios.get(BUSINESS_SERVER_URL + endPoints.entity_attribute)
        .then(({data}) => {
            store.dispatch(businessActions.entity_attributes(data));
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
        });
}


export function query_templates()
{
    axios.get(BUSINESS_SERVER_URL + endPoints.query_templates)
        .then(({data}) => {
            store.dispatch(businessActions.query_templates(data));
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
        });
}


export function user_bins()
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL + endPoints.user_bins;
    axios.get( url, config)
        .then(({data}) => {
            store.dispatch(businessActions.user_bins(data));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, корзинка НЕ активирована! " + err.message + " url:" + url + ".",
            }));
        });

        /*
        const request = axios({
            method: 'GET',
            url: AUTH_SERVER_URL+'/api/business/user-info/',
            headers: {'Authorization':'Bearer '+token}
        });

        request.then(
            response => (sender.setState({user_info:response.data})),
            err => (sender.setState({error:err.message}))
        );*/
}

export function bin_activate(bin_id, sender=null, new_state)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const url = BUSINESS_SERVER_URL + endPoints.bin_activate + bin_id;
    axios.put( url, {}, config)
        .then(({data}) => {
            let bin = data
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: format("Корзинка {} активирована!", bin.name)
            }));

            user_bins();
            //store.dispatch(businessActions.user_bins(data));

            if (sender) {
                sender.setState(new_state);
            }
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, корзинка НЕ активирована! " + err.message + " url:"+url+".",
            }));
        });
}


export function bin_get_active(sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    axios.get(BUSINESS_SERVER_URL+'/bin/get-active/', config)
        .then(({data}) => {
            sender.setState( { bin: data});
        })
        .catch( ( err ) => {
            sender.setState( { bin: {}, error: JSON.stringify(err)});
        });
}

export function get_active_bin_with_items(sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    axios.get(BUSINESS_SERVER_URL+'/bin/get-active/', config)
        .then((response) => {
            let Bin = response.data;
            let newState = { bin: Bin};
            axios.get(BUSINESS_SERVER_URL + '/bin/item/list/'+Bin.id, config)
                .then((response) => {
                    newState = {...newState, bin_items: response.data};

                    axios.get(BUSINESS_SERVER_URL + '/bin/list/', config)
                        .then((response) => {
                            newState = {...newState, bin_list: response.data};
                            sender.setState( newState);
                        })
                        .catch((err) => {
                            store.dispatch(alarmsActions.update([err.message]));
                        });
                })
                .catch((err) => {
                    store.dispatch(alarmsActions.update([err.message]));
                });
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
        });
}


export function bin_items(sender, bin_pk)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const url = BUSINESS_SERVER_URL + endPoints.bin_items + bin_pk;
    axios.get( url, config)
        .then(({data}) => {
            sender.setState({bin_items: data, bin_pk:bin_pk});
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, получения данных для корзинки:"  + err.message + " url:"+url,
            }));
        });
}


export function item_load(sender, item_id)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + endPoints.item + item_id, config)
        .then(({data}) => {
            sender.setState({item: data});
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
}


export function bin_reset(bin_pk)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;
    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const url = BUSINESS_SERVER_URL + endPoints.bin_reset + bin_pk;
    axios.get(url, config)
        .then(({data}) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Корзинка очищена!"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, корзинка НЕ очищена! " + err.message + " url:"+url+".",
            }));
        });
    user_bins();
}


export function item_delete(sender, bin_pk, item_id)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + '/bin/item/delete/' + item_id, config)
        .then(({data}) => {
            axios.get(BUSINESS_SERVER_URL + '/bin/item/list/'+bin_pk, config)
                .then((response) => {
                    sender.setState( { bin_items: response.data });
                })
                .catch((err) => {
                    store.dispatch(alarmsActions.update([err.message]));
                });
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
    //item_load(sender, bin_pk);
}


export function bin_to_graph(bin_pk, graph_pk, sender)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + '/bin-graph/load/' + bin_pk + '/' + graph_pk, config)
        .then(({data}) => {
            //store.dispatch(businessActions.user_bins(data));
            sender.setState({message: data});
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
}


export function bin_to_graph_extend(bin_pk, graph_pk, sender)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + '/bin-graph/load-extend/' + bin_pk + '/' + graph_pk, config)
        .then(({data}) => {
            //store.dispatch(businessActions.user_bins(data));
            sender.setState({message: data});
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
}

export function bin_create(new_bin_name, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    let bin_data = {
        name: new_bin_name,
        active: true,
    };
    const url = BUSINESS_SERVER_URL+'/bin/create/';
    axios.post( url, bin_data, config)
        .then((response) => {
            let new_bin = response.data
            bin_activate(new_bin.id, null, null);
            user_bins();
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Корзинка " + new_bin_name + " создана!"
            }));
            sender.setState({
                showModal:false
            })
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, создания корзинки! " + err.message + " url:"+url+", data:" + JSON.stringify(bin_data, 2, null),
            }));
        });
}

export function bin_delete(sender, bin_id) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL+'/bin/delete/' + bin_id;
    axios.delete( url, config)
        .then((response) => {
            user_bins();
            /*
            sender.setState({
                active_bin: {},
            })
            */

            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Корзинка удалена!"
            }));
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, удаления корзинки! " + err.message + " url:"+url,
            }));
        });
}


export function user_bin_items(sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL+'/bin/user-items/';
    axios.get( url, config)
        .then((response) => {
            user_bins();
            sender.setState({
                user_bin_items: response.data,
            });
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, загрузки последних запросов! " + err.message + " url:"+url,
            }));
        });
}

export function bin_items_data(bin_id, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL+'/bin/'+bin_id+'/items/data';
    axios.get( url, config)
        .then((response) => {
            sender.setState({
                loading: false,
                bin_items_data: response.data,
            });
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, загрузки последних запросов! " + err.message + " url:"+url,
            }));
        });
}


// LOADERS
export function load_json(bin_id, json_data, sender) {

    try {
        if (!Array.isArray(json_data))
            JSON.parse(json_data);
    } catch (err) {
        sender.setState({
            loading: false,
        }, () => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, проверки JSON! " + err.message,
            }));
        });
        return null;
    }

    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL+'/data-bin-loader/json/'+bin_id;
    axios.post( url, json_data, config)
        .then((response) => {
            sender.setState({
                loading: false,
            }, () => {
                store.dispatch(alertsActions.add({
                    id: new Date().getTime(),
                    type: "success",
                    message: "Загружен(о) " + response.data["data"].length + " объект(ов)"
                }));
            });
        })
        .catch( ( err ) => {
            sender.setState({
                loading: false,
            }, () => {
                store.dispatch(alertsActions.add({
                    id: new Date().getTime(),
                    type: "danger",
                    message: "Ошибка, загрузки данных! " + err.message + " url:"+url,
                }));
            });
        });
}




export function item_data_remove(bin_id, keys, sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };
    const url = BUSINESS_SERVER_URL+'/bin/items/data/remove/';
    axios.post( url, keys, config)
        .then((response) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Объект(ы) успешно удален(ы)"
            }));

            bin_items_data(bin_id, sender);
        })
        .catch( ( err ) => {
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "danger",
                message: "Ошибка, удаления! " + err.message + " url:"+url,
            }));
        });
}
