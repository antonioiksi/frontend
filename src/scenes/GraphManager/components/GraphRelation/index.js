import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader, Panel, Table} from "react-bootstrap";
import {relation_list, relation_create} from "../../../../services/graph/index";
import GraphRelationForm from "./components/GraphRelationForm/index";
import PropTypes from 'prop-types';

class GraphRelation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            loading: false,
            //relation_list: [],
        }
    }


    render() {
        const relation_list = this.props.relation_list;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h3>{strings.GraphRelations}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Begin}</th>
                                <th>{strings.End}</th>
                                <th>{strings.Comparatos}</th>
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
                                        <td>{JSON.stringify(value.comparators)}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-lg-4">
                        <Panel>
                            <h3>Определить новую связь</h3>
                            <GraphRelationForm  graph_id={this.props.graph_id}
                                                graph_list={this.props.graph_list}
                                                createRelationFunction={this.props.createRelationFunction}/>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

GraphRelation.PropTypes = {
    graph_id: PropTypes.integer,
    relation_list: PropTypes.array,
    graph_list: PropTypes.array,
    createRelationFunction: PropTypes.func,
}

export default GraphRelation;