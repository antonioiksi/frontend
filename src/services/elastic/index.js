import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";
import {prepare_q1} from "./queries";
import store from '../../store';
import {verifyToken} from "../session";
import {user_bins} from "../business";
import * as alertsActions from "../alerts/actions";




export function search_simple( sender, bin_id, esQuery, jsonQuery, cancelToken)
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

    let query = {
        esQuery: esQuery,
        jsonQuery: jsonQuery,
    };
    const url = BUSINESS_SERVER_URL+'/elastic-bin/mapped-search/' + bin_id;
    axios.post( url, query, config)
        .then((response) => {
            //console.log('axios' + index + JSON.stringify(jsonQuery));
            //console.log('axios' + index + JSON.stringify(q1));
            //console.log('axios'+i);
            let data = response.data;
            //let map = response.mapping;
            store.dispatch(alertsActions.add({
                id: new Date().getTime(),
                type: "success",
                message: "Запрос успешно выполнен! url:"+url+"data:"+JSON.stringify(jsonQuery, 2, null),
            }));
            sender.setState({
                loading: false,
                result: data,
            });
            /*
            sender.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [index] : {
                        loading:false,
                        result:data,
                        esQuery: esQuery,
                    }
                }
            }));*/
        })
        .catch( ( thrown ) => {

            if (axios.isCancel(thrown)) {
                //console.log('axios was canceled ' + index);
                //console.log('Request canceled', thrown.message);

                store.dispatch(alertsActions.add({
                    id: new Date().getTime(),
                    type: "info",
                    message: "Выполнение запроса успешно отменено! url:"+url+"data:"+JSON.stringify(jsonQuery, 2, null),
                }));

                sender.setState({
                    loading: false,
                });

                /*
                sender.setState( prevState => ({
                    multiResult: {
                        ...prevState.multiResult,
                        [index] : {
                            loading:false,
                            result:[],
                            esQuery: esQuery,
                        }
                    }
                }));*/
            }
            else {
                // handle error
                store.dispatch(alertsActions.add({
                    id: new Date().getTime(),
                    type: "danger",
                    message: "Ошибка, выполнения запроса! url:"+url + "data:" + JSON.stringify(esQuery,2,null) + "error: " + JSON.stringify(thrown,2,null),
                }));

                sender.setState({
                    loading: false,
                    //error: JSON.stringify(thrown),
                });

                /*
                sender.setState( prevState => ({
                    multiResult: {
                        ...prevState.multiResult,
                        [index] : {
                            error: JSON.stringify(thrown),
                            loading:false,
                            result:[],
                            esQuery: esQuery,
                        }
                    }
                }));*/
            }
        });
    return source;
}

export function search_drill( sender, esQuery, index)
{


    verifyToken();
    const session = store.getState().session;
    let token = session.tokens.access.value;

    let config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    axios.post(BUSINESS_SERVER_URL+'/elastic-bin/drill-search/', esQuery, config)
        .then(({data}) => {
            //console.log('axios' + index + JSON.stringify(jsonQuery));
            //console.log('axios' + index + JSON.stringify(q1));
            //console.log('axios'+i);
            sender.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [index] : {
                        loading:false,
                        result:data,
                        esQuery: esQuery,
                    }
                }
            }));
        })
        .catch( ( err ) => {
            sender.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [index] : {
                        error: JSON.stringify(err),
                        loading:false,
                        result:[],
                        esQuery: esQuery,
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





