import React, {Component} from 'react'
//import { connect } from 'react-redux';

import Form from './components/Form'
import {isAuth} from "../../components/auth";
import {Redirect} from "react-router-dom";
import {Panel} from "react-bootstrap";
import {connect} from "react-redux";
import {strings} from "../../localization";
import './style.css';
import {APP_TITLE} from "../../services/constants";

class Login extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        //const jwt = sessionStorage.getItem(SESSION_JWTOKEN);
        //if(!jwt && jwt!=='')
        //console.log()
        if(this.props.userId != null )
            return <Redirect to="/dashboard/"/>;

        return (
            <div className="col-md-4 col-md-offset-4 login-form">
                <div className="text-center">
                    <h1 className="login-brand-text">{ APP_TITLE }</h1>
                    {/*<h3 className="text-muted">Created by <a href="http://startreact.com">StartReact.com</a> team</h3>*/}
                </div>

                <Panel header={<h3>{strings.PleaseSignIn}</h3>} className="login-panel">
                    <div><Form errors={this.props.errors}/></div>
                </Panel>

            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        userId: store.session.user ? store.session.user.id : null,
        errors: store.alarms.messages,
    };
};


//export default connect(mapStateToProps, mapDispatchToProps)(Login);
//export default connect(mapStateToProps)(Login);
export default connect(mapStateToProps)(Login);