import axios from 'axios';
import {validToken} from "../../components/auth";
import {SESSION_JWTOKEN} from "../../components/auth";
import {BUSINESS_SERVER_URL} from "../constants";




export function attributes( sender)
{
    axios.get(BUSINESS_SERVER_URL+'/attributes/list/')
        .then(({data}) => {
            sender.setState({attrTypes: data});
        })
        .catch( ( err ) => {
            sender.setState({error: err.message});
        });
}

export function multifield_search_match( sender, jsonQuery)
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
        axios.post(BUSINESS_SERVER_URL+'/api/business/multifield-search-match/', jsonQuery, config)
            .then(({data}) => {
                sender.setState({result: data, loading:false});
            })
            .catch( ( err ) => {
                sender.setState({error: err.message});
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