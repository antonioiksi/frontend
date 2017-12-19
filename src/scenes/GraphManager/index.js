import React from 'react';
import {Button, PageHeader, Table} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_list} from "../../services/graph";
import Graph from "./components/Graph/index";
import GraphModel from "./components/GraphModel/index";
import GraphRelation from "./components/GraphRelation/index";
import {model_create, model_list, relation_create, relation_list} from "../../services/graph/index";

class GraphManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph_list:[],
            model_list:[],
            relation_list:[],
            active_graph_id: null
        }
        this.activateGraph = this.activateGraph.bind(this)
    }

    componentWillMount() {
        graph_list(this);
    }

    activateGraph(graph_id) {
        this.setState({active_graph_id:graph_id},
            () => {
                model_list(graph_id, this);
                relation_list(graph_id, this);
            });
    }

    createModel(model_data) {
        model_create(model_data, this);
    }
    createRelation(relation_data) {
        relation_create(relation_data, this);
    }


    render() {
        //const graph_list = this.state.graph_list;
        const model_list = this.state.model_list;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphManager}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Graph activateGraph={this.activateGraph} active_graph_id={this.state.active_graph_id}/>
                        {
                            this.state.active_graph_id ? (
                                <GraphModel graph_id={this.state.active_graph_id}
                                            model_list={this.state.model_list}
                                            createModelFunction={this.createModel.bind(this)}/>
                            ) : ('')
                        }
                        {
                            this.state.active_graph_id ? (
                                <GraphRelation graph_id={this.state.active_graph_id}
                                               relation_list={this.state.relation_list}
                                               createRelationFunction={this.createRelation.bind(this)}/>
                            ) : ('')
                            /*
                            this.state.active_graph_id ? (
                                <GraphRelation graph_list={this.state.graph_list}/>
                            ) : ('')
                            */
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphManager;