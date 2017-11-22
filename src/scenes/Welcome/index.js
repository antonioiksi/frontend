import React, {Component} from 'react'
import {connect} from "react-redux";
import {Panel} from "react-bootstrap";
import {attributes} from "../../services/business/index";
import Visjs from "./components/visjs/index";

class Welcome extends Component {

    componentWillMount() {
        attributes();
    }


    render() {

        return (
            <div>
                <h1>Welcome</h1>
                <p>Welcome content</p>
                {
                    this.props.errors && this.props.errors.length >0 ? (
                        this.props.errors.map((item, index) =>
                            <Panel header="Error" bsStyle="danger" eventKey={index}>{item}</Panel>)
                    ) : ('')
                }
                {
                    this.props.attributes && this.props.attributes.length >0 ? (
                        this.props.attributes.map((item, index) =>
                            <Panel header="Error" bsStyle="danger" eventKey={index}>{JSON.stringify(item)}</Panel>)
                    ) : ('')
                }

                <div id='mynetwork'>VisJS</div>
                <Visjs/>

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
