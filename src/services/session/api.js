import axios from 'axios';

import {AUTH_SERVER_URL} from "../constants";

const endPoints = {
    obtain: '/auth/token/obtain/',
    refresh: '/auth/token/refresh/',
};


export const obtain = ( username, password) => {
    return axios.post(AUTH_SERVER_URL + endPoints.obtain, {
        username: username,
        password: password
    });
};


export const refresh = ( refresh_token) =>
    axios.post(AUTH_SERVER_URL + endPoints.refresh, {
        refresh: refresh_token
    });
