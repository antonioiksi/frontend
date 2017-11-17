import React from 'react'
import {Route} from 'react-router-dom'

export const EmptyRoute =  ({component:Component, ...rest}) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="EmptyLayout">
                <Component {...matchProps}/>
            </div>
        )}/>
    )
};
