import * as actionTypes from "../actionTypes";

export const update = messages => ({
    type: actionTypes.ALARM_UPDATE,
    messages,
});