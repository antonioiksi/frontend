import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader, Table} from "react-bootstrap";
import {graph_relation_list} from "../../../../services/graph/index";

class GraphRelation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            graph_relation: [],
        }
    }

    componentWillMount() {
        graph_relation_list(this);
    }

    render() {
        const graph_relation = this.state.graph_relation;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphRelations}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Begin}</th>
                                <th>{strings.End}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                graph_relation.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{JSON.stringify(value.from_fields)}</td>
                                        <td>{JSON.stringify(value.to_fields)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>                    </div>
                </div>
            </div>
        )
    }
}

export default GraphRelation;