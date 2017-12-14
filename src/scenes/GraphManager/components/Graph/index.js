import React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader, Table} from "react-bootstrap";
import {strings} from "../../../../localization";
import {graph_remove, graph_clear, graph_list} from "../../../../services/graph";
import {graph_create} from "../../../../services/graph/index";

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph_list:[],
            error:'',
            form: {
                textValue:''
            },
        }
    }

    componentWillMount() {
        graph_list(this);
    }

    changeName(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({form: {...this.state.form, [fieldName]: fleldVal}},
            ()=>(console.log(this.state.form.textValue)));
    }

    submitForm(event) {
        event.preventDefault();
        let graph_data = { name: this.state.form.textValue}
        graph_create(graph_data, this);
        //
        //alert('okay');
    }

    resetGraph(graph) {
        let answer = window.confirm('Вы уверены что хотите очистить все данные из графа '+graph.name+' ?');
        if(answer) {
            graph_clear(graph.id, this);
        }
    }

    removeGraph(graph) {
        let answer = window.confirm('Вы уверены что хотите удалить '+graph.id + ' '+ graph.name + ' ?');
        if(answer) {
            graph_remove(graph.id, this);
        }
    }

    render() {
        const graph_list = this.state.graph_list;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.Graph}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Form horizontal>
                            <Col lg={8}>
                                <FormGroup controlId="formControlsText">
                                    <FormControl type="text" placeholder={strings.Name} name="textValue" onChange={this.changeName.bind(this)}/>
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
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>&#160;</th>
                                <th>&#160;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                graph_list.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>&#160;</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.resetGraph(value)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.removeGraph(value)}>{strings.Remove}</Button>&#160;
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Graph;