import store from '../../store';

export const SESSION_JWTOKEN = 'SESSION_JWTOKEN';
export const SESSION_USER_INFO = 'SESSION_USER_INFO';


// check out token exist
export const isAuth = () => {
    const session = store.getState().session;
    if(session.tokens.access.value!=null)
        return true;
    else
        return false;
}

// verify token
export const isAuthVerified = () => {
    const session = store.getState().session;
    if(session.tokens.access.value!=null)

        return true;
    else
        return false;
}
