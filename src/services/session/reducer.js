import * as actionTypes from "../actionTypes";


export const initialState = {
    tokens: {
        access: {
            //type: null,
            value: null,
            expiresIn: null,
        },
        refresh: {
            //type: null,
            value: null,
        },
    },
    user: {
        id: null,
    },
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SESSION_UPDATE:

            if(action.session.tokens.refresh) {
                return {
                    ...action.session
                }
            } else {
                return {
                    ...state,
                    tokens: {
                        ...state.tokens, access: action.session.tokens.access
                    }
                }
            }
        default:
            return state;
    }
};