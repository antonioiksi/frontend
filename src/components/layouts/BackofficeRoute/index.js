import React from 'react'
import {Route} from 'react-router-dom'
import {Header} from "../Header";
import AuthRequired from "../../auth/AuthRequired";
import './style.css';
import store from  "../../../store";
import * as alertsActions from "../../../services/alerts/actions";
import Alerts from "../Alerts";


export const BackofficeRoute =  ({component:Component, ...rest}) => {


    return (
        <Route {...rest} render={matchProps => (
            <div className="BackofficeLayout">
                <AuthRequired/>
                <Header/>
                <Alerts/>
                <div id="page-wrapper" className="page-wrapper">
                    <Component {...matchProps}/>
                </div>
            </div>
        )}/>
    )
}
