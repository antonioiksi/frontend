import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import * as businessActions from '../business/actions';
import * as alarmsActions from '../alarms/actions';
import store from '../../store';

export function attributes()
{
    axios.get(BUSINESS_SERVER_URL+'/attribute/list/')
        .then(({data}) => {
            store.dispatch(businessActions.attributes(data));

            //sender.setState({attrTypes: data});
        })
        .catch( ( err ) => {
            store.dispatch(alarmsActions.update([err.message]));
            //sender.setState({error: err.message});
        });
}
