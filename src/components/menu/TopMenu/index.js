import React from 'react';
import {NavLink} from 'react-router-dom';


export const TopMenu = () => {
    return (
        <ul>
            <li><NavLink to="/profile" activeClassName='hurray'>User Profile</NavLink></li>
            <li><NavLink to="/logout" activeClassName='hurray'>Logout</NavLink></li>
        </ul>

    )
}

