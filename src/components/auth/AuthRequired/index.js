import React from 'react';
import {Redirect} from 'react-router-dom';

import {isAuth} from "../";

export const AuthRequired = () => {
    return (
        isAuth() ? (<div></div>) : (<Redirect to="/login"/>)
    )

}
