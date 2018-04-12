import React from 'react';
import {strings} from "../../../../localization/index";
import {Button, PageHeader, Panel, Table} from "react-bootstrap";
import {drawing_list, model_list, model_create} from "../../../../services/graph/index";
import GraphModelForm from "./components/GraphModelForm";
import PropTypes from 'prop-types';
import _ from "lodash";
import {model_delete} from "../../../../services/graph";
import {bin_items_data} from "../../../../services/business";

class GraphModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            loading: false,

            model_list: [],
            drawing_list: [],
        }

        this.createModel = this.createModel.bind(this);
        this.removeModel = this.removeModel.bind(this);

    }

    componentWillMount() {
        model_list( this.props.graph.id, this)
        drawing_list(this)
    }

    componentWillReceiveProps(nextProps) {
        const sender = this;
        if(nextProps.graph) {
            if (typeof this.props.graph === "undefined" || this.props.graph.id !== nextProps.graph.id) {
                this.setState({
                    loading: true,
                }, () => {
                    model_list(nextProps.graph.id, sender);
                })
            }
        }
    }

    createModel(model_data) {
        model_create( this.props.graph.id, model_data, this);
    }

    removeModel(model_id) {
        model_delete( this.props.graph.id, model_id, this);
    }


    render() {
        const model_list = this.state.model_list;


        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphModels}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Fields}</th>
                                <th>{strings.Drawing}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                model_list.map((model, i) =>
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{model.name}</td>
                                            <td>{JSON.stringify(model.fields)}</td>
                                            <td>{ model.drawing ? model.drawing.name : ''}</td>
                                            <td>
                                                <Button  bsStyle="danger" bsSize="small" onClick={() => this.removeModel(model.id)}>{strings.Remove}</Button>&#160;
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-lg-4">
                        <Panel>
                            <h3>Добавить новый объект</h3>
                            <GraphModelForm graph_id={this.props.graph.id}
                                            drawing_list={this.state.drawing_list}
                                            createModelFunction={this.createModel}/>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

GraphModelForm.PropTypes = {
    graph: PropTypes.object,
}

export default GraphModel;