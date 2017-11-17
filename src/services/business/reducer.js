import * as actionTypes from "../actionTypes";


export const initialState = {
    attributes: [],
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BUSINESS_GET_ATTRIBUTES:
            return {
                attributes: action.attributes,
            };
        default:
            return state;
    }
};