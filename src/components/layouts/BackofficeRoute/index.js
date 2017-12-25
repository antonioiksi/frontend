import React from 'react'
import {Route} from 'react-router-dom'
import {Header} from "../Header";
import AuthRequired from "../../auth/AuthRequired";
import './style.css';


export const BackofficeRoute =  ({component:Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="BackofficeLayout">
                <AuthRequired/>
                <Header/>
                <div id="page-wrapper" className="page-wrapper">

                    <Component {...matchProps}/>

                </div>
            </div>
        )}/>
    )
}
