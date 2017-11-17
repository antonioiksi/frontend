import React from 'react';

import {NavLink} from 'react-router-dom';

export const Header = () => {
    return(
        <div>
            <h1>HEADER</h1>
            <ul>
                <li><NavLink to="/dashboard" activeClassName='hurray'>Dashboard</NavLink></li>
                <li><NavLink to="/search" activeClassName='hurray'>Search</NavLink></li>
            </ul>
        </div>
    )
}