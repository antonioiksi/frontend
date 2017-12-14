import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader, Table} from "react-bootstrap";
import {graph_model_list} from "../../../../services/graph/index";

class GraphModel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            graph_model: [],

        }
    }

    componentWillMount() {
        this.setState({loading:true},graph_model_list(this));
    }

    render() {
        const graph_model = this.state.graph_model;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphModels}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
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
                                            <td>{value.graph.name}</td>
                                            <td>{JSON.stringify(value.fields)}</td>
                                            <td>{value.drawing ? value.drawing.name : ''}</td>
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

export default GraphModel;