import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import {prepare_q1} from "./queries";
import store from '../../store';
import {verifyToken} from "../session";
import {user_bins} from "../business";




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


export function search_drill( sender, jsonQuery, index)
{


    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    if(!token) {
        sender.setState({error:'SESSION_JWTOKEN is empty'});
    }
    else {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        const i = index;
        //console.log(config);
        //console.log(prepare_q1( jsonQuery));
        let q1 = prepare_q1( jsonQuery)

        axios.post(BUSINESS_SERVER_URL+'/elastic-bin/drill-search/', q1, config)
            .then(({data}) => {
                console.log('axios' + index + JSON.stringify(jsonQuery));
                console.log('axios' + index + JSON.stringify(q1));
                //console.log('axios'+i);
                sender.setState( prevState => ({
                        multiResult: {
                            ...prevState.multiResult,
                            [i] : {
                                loading:false,
                                result:data,
                                esQuery: q1,
                            }
                        }
                    }));

                //sender.setState({result: data, esQuery: q1, loading:false});
            })
            .catch( ( err ) => {
                sender.setState( prevState => ({
                    multiResult: {
                        ...prevState.multiResult,
                        [i] : {
                            error: JSON.stringify(err),
                            loading:false,
                            result:[],
                            esQuery: q1,
                        }
                    }
                }));
                //sender.setState({result:[], esQuery:q1,  error: err.message, loading:false});
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


export function alias_list(sender) {
    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.get(BUSINESS_SERVER_URL+'/elastic/alias-list/', config)
        .then(({data}) => {
                sender.setState( { aliases: data});
            })
            .catch( ( err ) => {
                sender.setState( { aliases: {}, error: JSON.stringify(err)});
            });

}

