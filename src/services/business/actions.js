import * as actionTypes from "../actionTypes";


export const attributes = attributes => ({
    type: actionTypes.BUSINESS_GET_ATTRIBUTES,
    attributes,
});


export const user_bins = user_bins => ({
    type: actionTypes.BUSINESS_GET_USER_BINS,
    user_bins,
});


