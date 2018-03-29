import * as actionTypes from "../actionTypes";

export const reset = () => ({
    type: actionTypes.ALERTS_RESET,
});

export const add = alert => ({
    type: actionTypes.ALERTS_ADD,
    alert,
});

export const remove = alert => ({
    type: actionTypes.ALERTS_REMOVE,
    alert,
});