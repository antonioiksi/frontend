import React from 'react';
import {Redirect} from 'react-router-dom';

import {isAuth} from "../";
import {verifyToken} from "../../../services/session";
import {Panel} from "react-bootstrap";
import {connect} from "react-redux";

class AuthRequired extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        verifyToken();
    }

    render() {
        //if(!isAuth())
        //    return <Redirect to="/login"/>;
        if(this.props.userId == null )
            return <Redirect to="/login/"/>;

        //if(this.props.userId)
        //    return (<Redirect to="/dashboard/"/>);


        return (
                <div>
                </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        userId: store.session.user.id,
    };
};

export default connect(mapStateToProps)(AuthRequired);