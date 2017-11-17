import * as actionTypes from "../actionTypes";


export const initialState = {
    messages: [],
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALARM_UPDATE:
            return {
                messages: action.messages,
            };
        default:
            return state;
    }
};