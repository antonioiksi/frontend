import React from 'react';
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {strings} from "../../../../../../localization";
import PropTypes from 'prop-types';

class GraphRelationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error:'',
            loading: false,
            form: {
                from_fields:'',
                to_fields:'',
                comparators: '',
                name:'',
            },

        }
    }

    componentWillMount() {
        //this.setState({loading:true},model_list(this));
    }

    changeValue(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fleldVal}});
    }

    submitForm(event) {
        event.preventDefault();
        let relation_data = {
            ...this.state.form,
            from_fields: this.state.form.from_fields.split(','),
            to_fields: this.state.form.to_fields.split(','),
            comparators: this.state.form.comparators.split(','),
            graph: this.props.graph_id
        };
        this.props.createRelationFunction(relation_data, this);
    }

    render() {
        let graph_list = this.props.graph_list;
        if (!graph_list)
            graph_list = [];

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
                                    <FormControl type="text" placeholder="from_fields" name="from_fields" onChange={this.changeValue.bind(this)}/>
                                    <FormControl type="text" placeholder="to_fields" name="to_fields" onChange={this.changeValue.bind(this)}/>
                                    <FormControl type="text" placeholder="comparators" name="comparators" onChange={this.changeValue.bind(this)}/>
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

GraphRelationForm.PropTypes = {
    graph_id: PropTypes.integer,
    graph_list: PropTypes.array,
    createRelationFunction: PropTypes.func.isRequired,
}

export default GraphRelationForm;