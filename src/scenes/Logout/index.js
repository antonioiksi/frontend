import React, {Component} from 'react'
import {Redirect} from "react-router-dom";
import {logout} from "../../services/session";

class Logout extends Component {
    render() {
        logout();
        return (<Redirect to="/login/"/>);
    }
}

export default Logout;