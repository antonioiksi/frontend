import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import {prepare_q1} from "./queries";




export function search_simple( sender, jsonQuery)
{
    let token = sessionStorage.getItem(SESSION_JWTOKEN);

    if(!token) {
        sender.setState({error:'SESSION_JWTOKEN is empty'});
    }
    else {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        console.log(config);
        console.log(prepare_q1( jsonQuery));
        axios.post(BUSINESS_SERVER_URL+'/elastic/simple-search/', prepare_q1( jsonQuery), config)
            .then(({data}) => {
                sender.setState({result: data, loading:false});
            })
            .catch( ( err ) => {
                sender.setState({error: err.message,loading:false});
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
}


export function search_drill( sender, jsonQuery)
{
    let token = sessionStorage.getItem(SESSION_JWTOKEN);

    if(!token) {
        sender.setState({error:'SESSION_JWTOKEN is empty'});
    }
    else {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }

        console.log(config);
        console.log(prepare_q1( jsonQuery));
        axios.post(BUSINESS_SERVER_URL+'/elastic-bins/drill-search/', prepare_q1( jsonQuery), config)
            .then(({data}) => {
                sender.setState({result: data, loading:false});
            })
            .catch( ( err ) => {
                sender.setState({result:[], error: err.message, loading:false});
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
}

