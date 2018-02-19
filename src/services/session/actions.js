import * as actionTypes from "../actionTypes";

export const update = session => ({
    type: actionTypes.SESSION_UPDATE,
    session,
});


/*
export const login = (username, password) => ({
    type: actions.SESSION_LOGIN,
});

export const  = (err) => ({
    type: actions.SESSION_LOGIN,
});
*/