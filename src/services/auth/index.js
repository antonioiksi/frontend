import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {SESSION_JWTOKEN} from "../../components/auth";
import {AUTH_SERVER_URL} from "../constants";


export function obtain_jwt( sender, username, password) {
    axios.post(AUTH_SERVER_URL+'/auth/token/obtain/', {
        username: username,
        password: password
    }).then((response) => {
        //console.log(response);
        sessionStorage.setItem(SESSION_JWTOKEN, response.data.access);
        localStorage.setItem(SESSION_JWTOKEN, response.data.access);
        //store.dispatch(userJWTLogin(response.data.access));
        sender.setState({gotAccessToken: true});
    }).catch((err) => {
        //console.log(err.message);
        sender.setState({gotAccessToken: false, error: err.message});
    });
}

export function refresh_jwt( sender, refresh) {
    axios.post(AUTH_SERVER_URL+'/auth/token/refresh/', {
        refresh: refresh
    }).then((response) => {
        sessionStorage.setItem(SESSION_JWTOKEN, response.data.access);
        //store.dispatch(userJWTLogin(response.data.access));
        sender.setState({gotAccessToken: true});
    }).catch((err) => {
        sender.setState({gotAccessToken: false, error: err.message});
    });
}

export function verify_jwt( sender) {
    let token = sessionStorage.getItem(SESSION_JWTOKEN);

    axios.post(AUTH_SERVER_URL+'/auth/token/verify/', {
        token: token
    }).then((response) => {
        sender.setState({gotAccessToken: true});
    }).catch((err) => {
        sender.setState({gotAccessToken: false, error: err.message});
    });
}


export function get_user_info(sender) {

    // !!!!
    //let user_id = jwt_decode(sessionStorage.getItem(SESSION_JWTOKEN));

    let token = sessionStorage.getItem(SESSION_JWTOKEN);

    if(!token) {
        sender.setState({error:'SESSION_JWTOKEN is empty'});
    }
    else {
        const request = axios({
            method: 'GET',
            url: AUTH_SERVER_URL+'/auth/token/user-info/',
            headers: {'Authorization':'Bearer '+token}
        });

        request.then(
            response => (sender.setState({user_info:response.data})),
            err => (sender.setState({error:err.message}))
        );
    }
}

