import React from 'react';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader, Table} from "react-bootstrap";
import {strings} from "../../../../localization";
import {graph_remove, graph_clear, graph_list} from "../../../../services/graph";
import {graph_create, load_graph_data} from "../../../../services/graph/index";
import csv from 'csv';
import PropTypes from 'prop-types';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            graph_list:[],
            error:'',
            form: {
                name:''
            },
        }
        this.handleFileSelect = this.handleFileSelect.bind(this);
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
        let graph_data = this.state.form;
        graph_create(graph_data, this);
        //
        //alert('okay');
    }

    activateGraph(graph_id) {
        this.props.activateGraph(graph_id);
    }

    resetGraph(graph) {
        let answer = window.confirm('Вы уверены что хотите очистить все данные из графа ' + graph.name + ' ?');
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

    handleFileSelect(evt) {
        let graph_name = evt.target.name;
        let files = evt.target.files;
        if (!files.length) {
            alert('No file select');
            return;
        }
        const sender = this;
        const reader = new FileReader();
        reader.onload = () => {
            // http://csv.adaltas.com/parse/examples/
            csv.parse(reader.result, {columns: true}, (err, data) => {
                if(err) {
                    console.log(err.message);
                    this.setState({message:err.message})
                } else {
                    console.log(data);
                    load_graph_data(graph_name, data, sender);
                }


            });
        };
        //reader.readAsBinaryString(files[0]);
        //reader.readAsBinaryString(files[0],'utf8');
        //reader.readAsText(files[0],'CP1251');
        reader.readAsText(files[0],'utf8');
        /*
        reader.readAsBinaryString(e[0]);
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log( reader.result);
            //that.loadData(e.target.result);
            //load_graph_data(graph_name, json_data, sender);
        };
        reader.readAsText(files[0]);*/

    }



    render() {
        const graph_list = this.state.graph_list;

        //TODO try change type=file to <Dropzone name={field.name} onDrop={onDrop} />

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.Graph}</h3>
                    </div>
                </div>
                {this.state.message!=='' ? (<div className="row">
                    <div className="col-lg-12">
                        {this.state.message}
                    </div>
                </div>):('')}
                <div className="row">
                    <div className="col-lg-4">
                        <Form horizontal>
                            <Col lg={8}>
                                <FormGroup controlId="formControlsText">
                                    <FormControl type="text" placeholder={strings.Name} name="name" onChange={this.changeName.bind(this)}/>
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
                                <th>{strings.Active}</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Rows}</th>
                                <th>&#160;</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                graph_list.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{
                                            value.id === this.props.active_graph_id ? ('*') : ('')
                                        }</td>
                                        <td>{value.name}</td>
                                        <td>{value.graphdata_count}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.activateGraph(value.id)}>{strings.Activate}</Button>&#160;
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.resetGraph(value)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.removeGraph(value)}>{strings.Remove}</Button>&#160;
                                            <FormControl type="file" name={value.name} onChange={this.handleFileSelect} />
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

Graph.PropTypes = {
    active_graph_id: PropTypes.string,
}

export default Graph;