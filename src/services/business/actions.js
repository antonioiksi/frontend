import * as actionTypes from "../actionTypes";


export const attributes = attributes => ({
    type: actionTypes.BUSINESS_GET_ATTRIBUTES,
    attributes,
});

export const entity_attributes = entity_attributes => ({
    type: actionTypes.BUSINESS_GET_ENTITY_ATTRIBUTES,
    entity_attributes,
});



export const user_bins = user_bins => ({
    type: actionTypes.BUSINESS_GET_USER_BINS,
    user_bins,
});


export const query_templates = query_templates => ({
    type: actionTypes.BUSINESS_GET_QUERY_TEMPLATES,
    query_templates,
});

