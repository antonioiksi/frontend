import React, {Component} from 'react'
import {Button, Nav, NavItem, PageHeader} from "react-bootstrap";
import VisGraph from "./components/VisGraph";
import {strings} from "../../localization/index";
import {graph_object_list, objects_by_name} from "../../services/graph";
import * as _ from "lodash";
import ReactJson from 'react-json-view'
import './style.css';

//TODO add some cool charts

class GraphBuilder extends Component {

    constructor(props) {
        super(props)

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            graph_object: [],
            nodes: [],
            edges: [],
            mode: '1',
        }
    }

    componentWillMount() {
        graph_object_list(this);
    }

    handleSelect(eventKey) {
        //event.preventDefault();
        this.setState({mode:eventKey});
        //alert(`selected ${eventKey}`);
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

            //TODO add another fields for label
            let label_field = graph_object.fields[0];
            item.label = el[label_field];


            temp_nodes.push(item);
        });

        let nds = this.state.nodes.concat(temp_nodes);
        //remove dublicates
        //nds = _.uniq(nds, 'id');
        let nds2 = _.uniqBy( nds, 'id');

        this.setState({
            nodes: nds2,
        })
    }

    placeStrictEdges() {
        let temp_edges = [];

        this.state.graph_object.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.graph_object.forEach(graph_object_ => {
                let graph_object_name_ = graph_object_.name;
                if(graph_object_name!==graph_object_name_) {

                    if(this.state[graph_object_name] &&
                        this.state[graph_object_name_]) {
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
                }
            });

        });

        this.setState({
            edges: temp_edges,
        })
    }

    placeAbonentEdges() {
        let temp_edges = [];
        let graph_object_name = 'abonent';
        let graph_object_name_ = 'abonent';
        if(this.state[graph_object_name] &&
            this.state[graph_object_name_]) {

            this.state[graph_object_name].forEach(phoneA => {
                this.state[graph_object_name_].forEach(phoneB => {
                    if (phoneA.NumberPhoneA === phoneB.NumberPhoneB) {
                        temp_edges.push({
                            from: graph_object_name + '_' + phoneA._id,
                            to: graph_object_name_ + '_' + phoneB._id
                        })
                    }
                });
            });
        }

        this.setState({
            edges: temp_edges,
        })
    }

    placeFieldsEdges() {
        let temp_edges = [];

        this.state.graph_object.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.graph_object.forEach(graph_object_ => {
                let graph_object_name_ = graph_object_.name;
                if(graph_object_name!==graph_object_name_) {

                    if(this.state[graph_object_name] &&
                        this.state[graph_object_name_]) {
                        this.state[graph_object_name].forEach(person => {
                            this.state[graph_object_name_].forEach(phone => {


                                if (person[graph_object.fields[0]] === phone[graph_object_.fields[0]]) {
                                    temp_edges.push({
                                        from: graph_object_name+'_'+person._id,
                                        to: graph_object_name_+'_'+phone._id
                                    })
                                }
                            });
                        });

                    }


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
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.clearGraph()}>Clear</Button>
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.placeStrictEdges()}>Load strict edges</Button>
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.placeFieldsEdges()}>Load fields edges</Button>
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.placeAbonentEdges()}>Load abonent edges</Button>
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
                        <Nav bsStyle="tabs" justified activeKey={this.state.mode} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" title="Item1">Graph</NavItem>
                            <NavItem eventKey="2" title="Item2">Table</NavItem>
                        </Nav>
                        <div>
                        {
                            this.state.mode==='1' ? (<VisGraph Nodes={this.state.nodes} Edges={this.state.edges} NodeTypes={this.state.graph_object} />) :
                                (<ReactJson src={this.state.nodes} />)
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default GraphBuilder