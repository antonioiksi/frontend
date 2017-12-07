import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import * as businessActions from '../business/actions';
import * as alarmsActions from '../alarms/actions';
import store from '../../store';
import {verifyToken} from "../session";

const endPoints = {
    attributes: '/attribute/list/',
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
    }

    axios.get(BUSINESS_SERVER_URL + endPoints.user_bins, config)
        .then(({data}) => {
            store.dispatch(businessActions.user_bins(data));
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
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

export function bin_activate(sender, bin_name)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + endPoints.bin_activate + bin_name, config)
        .then(({data}) => {
            store.dispatch(businessActions.user_bins(data));
        })
        .catch( ( err ) => {
            //sender.setState();
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

    axios.get(BUSINESS_SERVER_URL + endPoints.bin_items + bin_pk, config)
        .then(({data}) => {
            sender.setState({bin_items: data, bin_pk:bin_pk});
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
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
    axios.get(BUSINESS_SERVER_URL + endPoints.bin_reset + bin_pk, config)
        .then(({data}) => {
            //sender.setState({item: data});
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
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

    axios.get(BUSINESS_SERVER_URL + endPoints.item_delete + item_id, config)
        .then(({data}) => {
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
    item_load(sender, bin_pk);
}



export function bin_to_graph(bin_pk)
{
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL + endPoints.bin_to_graph + bin_pk, config)
        .then(({data}) => {
            //store.dispatch(businessActions.user_bins(data));
        })
        .catch( ( err ) => {
            //sender.setState();
            store.dispatch(alarmsActions.update([err.message]));
        });
}