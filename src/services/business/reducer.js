import * as actionTypes from "../actionTypes";


export const initialState = {
    attributes: [],
    user_bins: [],
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUSINESS_GET_ATTRIBUTES:
            return {...state, attributes: action.attributes};
        case actionTypes.BUSINESS_GET_USER_BINS:
            return {...state, user_bins: action.user_bins};
        default:
            return state;
    }
};