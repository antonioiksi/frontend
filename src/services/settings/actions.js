import * as actionTypes from "../actionTypes";

export const load = settings => ({
    type: actionTypes.SETTINGS_LOAD,
    settings,
});