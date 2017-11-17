import React from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock} from "react-bootstrap";
import PropTypes from 'prop-types';

import {Validator} from 'jsonschema';
import Schema from './schema.json';
import Test from './test.json';

function FieldGroup({ id, label, help, ...props }) {

        return (
            <FormGroup controlId={id}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl {...props}/>
                {help && <HelpBlock>{help}</HelpBlock>}

            </FormGroup>
        );
}

class SearchFileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    displayData(content) {
        //var data = require('./test.json');
        //alert(JSON.stringify(Test));

        //console.log(validate(4, {"type": "number"}));

        var v = new Validator();
        var instance = 4;
        var schema = {"type": "number"};
        console.log(v.validate(Test, Schema));

        /*
        fetch('./test.json',{
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((res) => {console.log(res); return res.json()})
            .then((data) => {
                //console.log('data:', data);
                //this.setState({data: data});
            })
        */
        //this.setState({data: data});



        this.props.loadQuery(JSON.parse(content));
    }


    handleFileSelect(evt) {
        let files = evt.target.files;
        if (!files.length) {
            alert('No file select');
            return;
        }
        let file = files[0];
        let that = this;
        let reader = new FileReader();
        reader.onload = function(e) {
            that.displayData(e.target.result);
        };
        reader.readAsText(file);
    }

    render() {
        const data = this.state.data;
        return(
            <div>
                <h1>SearchFileUpload</h1>
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="File"
                    help="Example block-level help text here."
                    accept=".json"
                    onChange={this.handleFileSelect}
                />
                { data && <p> {data} </p> }


            </div>
        )
    }
}

SearchFileUpload.PropTypes = {
    loadQuery: PropTypes.func.isRequired,
};
export default SearchFileUpload;