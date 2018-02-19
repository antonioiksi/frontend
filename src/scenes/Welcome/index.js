import React, {Component} from 'react'
import {connect} from "react-redux";
import {Panel} from "react-bootstrap";
import {attributes} from "../../services/business/index";
import Visjs from "./components/visjs/index";
import Redirect from "react-router-dom/es/Redirect";
import store from "../../store";
import * as alarmActions from "../../services/alarms/actions";
import './style.css';
import TestBackendServer from "./components/TestBackendServer/index";

class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //attributes();
        let querystring = this.props.location.search;
        //if(querystring.indexOf('clear')>0) {
        store.dispatch(alarmActions.update([]));
        //}
    }

    render() {

        //store.dispatch()

        return (
            <div className="container welcome">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <h1>Welcome</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 text-center">
                    {
                        this.props.errors && this.props.errors.length >0 ? (
                            this.props.errors.map((item, index) =>
                                <Panel key={index} header="Error" bsStyle="danger" eventKey={index}>{item}</Panel>)
                        ) : ('')
                    }
                    </div>
                </div>
                <TestBackendServer/>
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        attributes: store.business.attributes,
        errors: store.alarms.messages,
    };
};

export default connect(mapStateToProps)(Welcome);
//export default Welcome;
