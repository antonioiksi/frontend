import React from 'react';
import {NavLink} from 'react-router-dom';


export const OfficeMenu = () => {
    return (
        <ul>
            <li><NavLink to="/dashboard" activeClassName='hurray'>Dashboard</NavLink></li>
            <li><NavLink to="/search" activeClassName='hurray'>Search</NavLink></li>
        </ul>

    )
}

