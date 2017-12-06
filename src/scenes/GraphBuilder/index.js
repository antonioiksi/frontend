import React, {Component} from 'react'
import {Button, PageHeader} from "react-bootstrap";
import VisGraph from "./components/VisGraph";
import {strings} from "../../localization/index";
import {graph_object_list, objects_by_name} from "../../services/graph";
import * as _ from "lodash";

//TODO add some cool charts

class GraphBuilder extends Component {

    constructor(props) {
        super(props)



        this.state = {
            graph_object: [],
            nodes: [],
            edges: [],
        }
    }

    componentWillMount() {
        graph_object_list(this);
    }

    loadObjects(object_name) {
        objects_by_name(object_name, this);
    }

    clearGraph() {
        this.setState({nodes:[]});
    }

    placeToGraphObjects(object_name) {
        let temp_nodes = [];
        this.state[object_name].forEach(el => {
            let item = _.clone( el);
            item.id = object_name+'_'+el._id;

            //let graph_object = _.filter(this.state.graph_object, { 'name': object_name,});
            let graph_object = _.findLast(this.state.graph_object, { 'name': object_name,});
            let label_field = graph_object.fields[0];
            item.label = el[label_field];
            temp_nodes.push(item);
        });

        this.setState({
            nodes: this.state.nodes.concat(temp_nodes),
        })
    }

    placeStrictEdges() {
        let temp_edges = [];

        this.state.graph_object.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.graph_object.forEach(graph_object_ => {
                let graph_object_name_ = graph_object_.name;
                if(graph_object_name!==graph_object_name_) {

                    this.state[graph_object_name].forEach(person => {
                        this.state[graph_object_name_].forEach(phone => {
                            if (person._id === phone._id) {
                                temp_edges.push({
                                    from: graph_object_name+'_'+person._id,
                                    to: graph_object_name_+'_'+phone._id
                                })
                            }
                        });
                    });

                }
            });

        });

        this.setState({
            edges: temp_edges,
        })


    }

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphBuilder}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.clearGraph()}>Clear</Button>
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.placeStrictEdges()}>Load strict edges</Button>
                    </div>
                </div>
                <div className="row">
                {
                    this.state.graph_object.map( object  =>
                            <div className="col-lg-1" key={object.id}>
                                <Button  bsStyle="danger" bsSize="small" onClick={() => this.loadObjects(object.name)}>Load {object.name}</Button>
                                <Button  bsStyle="success" bsSize="small" onClick={() => this.placeToGraphObjects(object.name)}>Place {object.name}</Button>
                            </div>
                    )
                }
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        GraphBuilder
                        <VisGraph Nodes={this.state.nodes} Edges={this.state.edges} />
                    </div>
                </div>
            </div>
        )
    }

}

export default GraphBuilder