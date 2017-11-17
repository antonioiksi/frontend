import store from '../../store';

export const SESSION_JWTOKEN = 'SESSION_JWTOKEN';
export const SESSION_USER_INFO = 'SESSION_USER_INFO';

export const isAuth = () => {
    const session = store.getState().session;
    if(session.tokens.access.value!=null)
        return true;
    else
        return false;
}

