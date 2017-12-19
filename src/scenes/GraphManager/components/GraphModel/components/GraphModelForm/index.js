import React from 'react';
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {strings} from "../../../../../../localization";
import PropTypes from 'prop-types';
import './style.css';

class GraphModelForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            error:'',
            form: {
                fields:'',
                name:'',
                drawing: null,
            },

        }
    }

    componentWillMount() {
        //this.setState({loading:true},model_list(this));
    }

    changeValue(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fleldVal}},
            ()=>(console.log(this.state.form.textValue)));
    }

    changeSelect(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        //let fleldVal = Number.parseInt(event.target.value);
        this.setState({form: {...this.state.form, [fieldName]: fleldVal}});
        //alert(fleldVal);
    }

    submitForm(event) {
        event.preventDefault();
        let model_data = {
            ...this.state.form,
            fields: this.state.form.fields.split(','),
            graph: this.props.graph_id,
        };
        this.props.createModelFunction(model_data, this);
        //graph_create(graph_data, this);
        //
        //alert('okay');
    }


    render() {
        let graph_list = this.props.graph_list;
        if (!graph_list)
            graph_list = [];

        let drawing_list = this.props.drawing_list;
        if(!drawing_list)
            drawing_list = [];
        return (
            <div>
                {this.state.message!=='' ? (<div className="row">
                    <div className="col-lg-12">
                        {this.state.message}
                    </div>
                </div>):('')}
                <div className="row">
                    <div className="col-lg-12">
                        <Form horizontal>
                            <Col lg={8}>
                                <FormGroup controlId="formControlsText">
                                    <FormControl type="text" placeholder={strings.FillName} name="name" onChange={this.changeValue.bind(this)}/>
                                    <FormControl type="text" placeholder={strings.FillFields} name="fields" onChange={this.changeValue.bind(this)}/>
                                    <FormControl componentClass="select" name="drawing" onChange={this.changeValue.bind(this)} defaultValue="0">
                                        <option disabled value="0" >{strings.FillDrawing}</option>
                                        {drawing_list.map((attr) =>
                                            <option key={attr.name} value={attr.id}>
                                                {attr.name}
                                            </option>
                                        )}
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col lg={3} lgOffset={1}>
                                <FormGroup>
                                    <Button type="submit" bsSize="small" name="Add" onClick={this.submitForm.bind(this)}>
                                        {strings.Save}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Form>
                    </div>


                </div>
            </div>
        )
    }
}

GraphModelForm.PropTypes = {
    graph_id: PropTypes.integer,
    //graph_list: PropTypes.array,
    drawing_list: PropTypes.array,
    createModelFunction: PropTypes.func.isRequired,
}

export default GraphModelForm;