import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader, Table} from "react-bootstrap";
import {relation_list, relation_create} from "../../../../services/graph/index";
import GraphRelationForm from "./components/GraphRelationForm/index";
import PropTypes from 'prop-types';

class GraphRelation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            relation_list: [],
        }
    }

    componentWillMount() {
        relation_list(this);
    }

    createRelation(relation_data) {
        relation_create(relation_data, this);
    }

    render() {
        const relation_list = this.state.relation_list;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphRelations}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <GraphRelationForm graph_list={this.props.graph_list} createRelationFunction={this.createRelation.bind(this)}/>
                    </div>
                    <div className="col-lg-8">
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
                                relation_list.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{JSON.stringify(value.from_fields)}</td>
                                        <td>{JSON.stringify(value.to_fields)}</td>
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

GraphRelation.PropTypes = {
    graph_list: PropTypes.array,
}

export default GraphRelation;