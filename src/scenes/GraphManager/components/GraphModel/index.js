import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader, Table} from "react-bootstrap";
import {drawing_list, model_list, model_create} from "../../../../services/graph/index";
import GraphModelForm from "./components/GraphModelForm";
import PropTypes from 'prop-types';

class GraphModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            loading: false,
            model_list: [],
            drawing_list: [],
        }

        //this.createModel = this.createModel.bind(this);

    }

    componentWillMount() {
        drawing_list(this);
        this.setState({loading:true},model_list(this));
    }

    createModel(model_data) {
        model_create(model_data, this);
    }


    render() {
        const graph_model = this.state.model_list;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphModels}</h3>
                    </div>
                </div>
                {this.state.error!=='' ? (<div className="row">
                    <div className="col-lg-12">
                        {this.state.error}
                    </div>
                </div>):('')}

                <div className="row">
                    <div className="col-lg-4">
                        <GraphModelForm graph_list={this.props.graph_list} drawing_list={this.state.drawing_list} createModelFunction={this.createModel.bind(this)}/>
                    </div>
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Graph}</th>
                                <th>{strings.Fields}</th>
                                <th>{strings.Drawing}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                graph_model.map((value, i) =>
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{value.name}</td>
                                            <td>{value.graph}</td>
                                            <td>{JSON.stringify(value.fields)}</td>
                                            <td>{value.drawing ? value.drawing : ''}</td>
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

GraphModelForm.PropTypes = {
    graph_list: PropTypes.array,
    drawing_list: PropTypes.array,
}

export default GraphModel;