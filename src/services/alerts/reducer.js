import * as actionTypes from "../actionTypes";
import _ from 'lodash';


export const initialState = {
    alerts : [
        /*{
            id: new Date().getTime(),
            type: "info",
            message: "Hello, world"
        },*/
    ]
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ALERTS_RESET:
            return initialState;
        case actionTypes.ALERTS_ADD:
            const prev = state.alerts;
            console.log(prev);
            prev.push(action.alert);
            //return initialState;
            return {
                ...state,
                alerts: [...state.alerts, action.alert]
            };
        case actionTypes.ALERTS_REMOVE:
            const res = _.filter(state.alerts, (current) => {
                return current.id !== action.alert.id;
            });
            console.log(res);
            return {
                ...state,
                alerts: res,
            };
        default:
            return state;
    }
};
