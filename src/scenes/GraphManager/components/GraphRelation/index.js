import React from 'react';
import {strings} from "../../../../localization/index";
import {Button, PageHeader, Panel, Table} from "react-bootstrap";
import {relation_list, relation_create} from "../../../../services/graph/index";
import GraphRelationForm from "./components/GraphRelationForm/index";
import PropTypes from 'prop-types';
import {drawing_list, model_create, model_delete, model_list, relation_delete} from "../../../../services/graph";

class GraphRelation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            relation_list: [],
        }

        this.createRelation = this.createRelation.bind(this)
    }

    componentWillMount() {
        relation_list(this.props.graph.id, this);
    }

    componentWillReceiveProps(nextProps) {
        const sender = this;
        if(nextProps.graph) {
            if (typeof this.props.graph === "undefined" || this.props.graph.id !== nextProps.graph.id) {
                this.setState({
                    loading: true,
                }, () => {
                    relation_list(this.props.graph.id, this);
                })
            }
        }
    }

    createRelation(relation_data) {
        relation_create( this.props.graph.id, relation_data, this);
    }

    removeRelation(relation_id) {
        relation_delete( this.props.graph.id, relation_id, this);
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
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Begin}</th>
                                <th>{strings.End}</th>
                                <th>{strings.Comparatos}</th>
                                <th></th>
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
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.removeRelation(value.id)}>{strings.Remove}</Button>&#160;
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-lg-4">
                        <Panel>
                            <h3>Определить новую связь</h3>
                            <GraphRelationForm  graph_id={this.props.graph.id}
                                                createRelationFunction={this.createRelation}/>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

GraphRelation.PropTypes = {
    graph: PropTypes.object,
    graph_list: PropTypes.array,
}

export default GraphRelation;