import React,{Component} from 'react';
import {Button, Panel} from "react-bootstrap";
import {get_user_info} from "../../services/auth";
import ReactJson from 'react-json-view';


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:'',
            user_info:{},
        }
    }

    handleClick(event) {
        get_user_info(this);
    }

    render() {
        const {error, user_info} = this.state;
        return (
            <div>
                <h1>Test page</h1>
                { error && <Panel header="Error" bsStyle="danger">{error}</Panel>}
                { user_info && <Panel header="Success" bsStyle="success"><ReactJson src={user_info} /></Panel>}

                <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleClick()}>Click</Button>
            </div>
        )
    }
}

export default Test;