import * as actionTypes from "../actionTypes";


export const initialState = {
    settings: [],
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SETTINGS_LOAD:
            return action.settings;
        default:
            return state;
    }
};