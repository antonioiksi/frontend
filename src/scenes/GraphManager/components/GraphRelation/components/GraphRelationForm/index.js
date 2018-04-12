import React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";
import {strings} from "../../../../../../localization";
import PropTypes from 'prop-types';
import './style.css'

class GraphRelationForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error:'',
            loading: false,
            form: {
                name:'',
                from_fields:'',
                to_fields:'',
                comparators: '',
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

        this.props.createRelationFunction(relation_data);
    }

    render() {
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
                                <FormGroup controlId="name">
                                    <FormControl type="text" placeholder={strings.FillName} name="name" onChange={this.changeValue.bind(this)}/>
                                </FormGroup>
                                <FormGroup controlId="from_fields">
                                    <FormControl type="text" placeholder="from_fields" name="from_fields" onChange={this.changeValue.bind(this)}/>
                                </FormGroup>
                                <FormGroup controlId="to_fields">
                                    <FormControl type="text" placeholder="to_fields" name="to_fields" onChange={this.changeValue.bind(this)}/>
                                </FormGroup>
                                <FormGroup controlId="comparators">
                                    <FormControl componentClass="select" placeholder="comparators" name="comparators" onChange={this.changeValue.bind(this)}>
                                        <option selected disabled>Выберите тип сравнения</option>
                                        <option value="equal">полное совпадения</option>
                                        <option value="include">частичное вхождение</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>
                            <Col lg={3} lgOffset={1}>
                                <Button type="submit" bsSize="small" bsStyle="success" name="Add" onClick={this.submitForm.bind(this)}>{strings.Save}</Button>
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
    createRelationFunction: PropTypes.func.isRequired,
}

export default GraphRelationForm;