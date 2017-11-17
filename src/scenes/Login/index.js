import React, {Component} from 'react'
//import { connect } from 'react-redux';

import Form from './components/Form'
import {isAuth} from "../../components/auth";
import {Redirect} from "react-router-dom";
import {Panel} from "react-bootstrap";

class Login extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        //const jwt = sessionStorage.getItem(SESSION_JWTOKEN);
        //if(!jwt && jwt!=='')

        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="text-center">
                    <h1 className="login-brand-text">Frontend Admin React</h1>
                    {/*<h3 className="text-muted">Created by <a href="http://startreact.com">StartReact.com</a> team</h3>*/}
                </div>

                <Panel header={<h3>Please Sign In</h3>} className="login-panel">
                    <div><Form /></div>
                </Panel>

            </div>
        )
    }
}


//export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default connect(mapStateToProps)(Login);
export default Login