import React from 'react';
import {Button, PageHeader, Panel, Table} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_create, graph_list} from "../../services/graph";
import Graph from "./components/Graph/index";
import GraphModel from "./components/GraphModel/index";
import GraphRelation from "./components/GraphRelation/index";
import {model_create, model_list, relation_create, relation_list} from "../../services/graph/index";

class GraphManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active_graph: null,
        }
        this.setActivateGraph = this.setActivateGraph.bind(this)
    }

    componentWillMount() {
        graph_list(this);
    }

    setActivateGraph(graph) {
        this.setState({active_graph: graph})
    }




    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphManager}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Graph setActivateGraph={this.setActivateGraph}/>
                        {
                            this.state.active_graph &&
                                <Panel>
                                    <h2>Описание схемы данных &#171;{this.state.active_graph.name}&#187;</h2>
                                    {
                                        this.state.active_graph ? (
                                            <GraphModel graph={this.state.active_graph}/>
                                        ) : ('')
                                    }
                                    {
                                        this.state.active_graph ? (
                                            <GraphRelation graph={this.state.active_graph}/>
                                        ) : ('')
                                    }
                                </Panel>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphManager;