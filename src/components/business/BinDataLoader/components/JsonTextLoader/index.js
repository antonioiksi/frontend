import React from "react";
import {ScaleLoader} from "react-spinners";
import {strings} from "../../../../../localization";
import {Button, FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import * as alertsActions from "../../../../../services/alerts/actions";
import store from "../../../../../store";
import {load_json} from "../../../../../services/business";

class JsonTextLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            value: '',
        }
    }

    change(e) {
        this.setState({value: e.target.value});
    }

    load() {
        const sender = this;
        if(this.props.active_bin) {
            this.setState({
                loading: true,
            }, () => {
                load_json(this.props.active_bin.id, this.state.value, sender);
            })
        }
    }

    render() {
        if(this.state.loading) {
            return (
                <ScaleLoader
                    color={'#36D7B7'}
                    loading={true}
                />
            )
        }

        return (
            <div>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>JSON text</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="[{'person_name':'Иванов'}]" onChange={this.change.bind(this)} />
                </FormGroup>
                <Button  bsStyle="success" bsSize="small" onClick={this.load.bind(this)}>{strings.Load}</Button>
            </div>
        )
    }
}

export default JsonTextLoader;
