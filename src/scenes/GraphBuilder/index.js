import React, {Component} from 'react'
import {Button, Nav, NavItem, PageHeader} from "react-bootstrap";
import VisGraph from "./components/VisGraph";
import {strings} from "../../localization/index";
import {graph_model_list} from "../../services/graph";
import * as _ from "lodash";
import ReactJson from 'react-json-view'
import './style.css';
import {graph_nodes_by_models, graph_relation_list} from "../../services/graph/index";
import NodesLoader from "./components/NodesLoader";

//TODO add some cool charts

class GraphBuilder extends Component {

    constructor(props) {
        super(props)


        this.state = {
            graph_model: [],
            graph_relation: [],
            nodes: [],
            edges: [],
            mode: '1',
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.addNodes = this.addNodes.bind(this);
        this.addRelations = this.addRelations.bind(this);
    }

    componentWillMount() {
        graph_model_list(this);
        graph_relation_list(this);
    }

    addNodes(model_names) {
        //graph_nodes_by_models(['phoneA','phoneB'], this);
        //graph_nodes_by_models(['person'], this);

        graph_nodes_by_models(model_names, this);
        /*
        this.setState({
           nodes: [...this.state.nodes, nodes]

        });*/
    }

    addRelations(relation_names) {
        const rel_name = relation_names[0];
        const rel = _.find(this.state.graph_relation, {name: rel_name});
        //const rel = this.state.relation[2];

        let temp_edges = [];
        for(let i1=0; i1 <  this.state.nodes.length; i1++) {
            for(let i2=i1+1; i2 <  this.state.nodes.length; i2++) {
                const node1 = this.state.nodes[i1];
                const node2 = this.state.nodes[i2];
                if(node1.id!==node2.id) {
                    let succes = true;
                    for(let i=0; i < rel.from_fields.length; i++) {

                        let val1 = node1[rel.from_fields[i]];
                        let val2 = node2[rel.to_fields[i]];
                        if(val1!==val2) {
                            succes = false;
                            break;
                        }
                    }
                    if(succes) {
                        //let str = JSON.stringify(node1)  + '______' + JSON.stringify(node2) ;
                        //console.log(str)
                        temp_edges.push({
                            from: node1.id,
                            to: node2.id,
                            label: rel.name,
                            width: 2,
                            length: 400,
                            color:{color:'rgba(30,30,30,0.2)', highlight:'blue'},
                            color:{color:'#ff0000', opacity:0.3, highlight: '#00ff00'},

                            /*color: 'red' - doesnot work */
                        })
                    }
                }
            }
        }

        this.setState({
            edges: this.state.edges.concat(temp_edges),
        });
    }

    clearNodes() {
        this.setState({
            nodes: [],
        });
    }


    /**
     * Select tabs item
     * @param eventKey
     */
    handleSelect(eventKey) {
        //event.preventDefault();
        this.setState({mode:eventKey});
        //alert(`selected ${eventKey}`);
    }





    /*
    placeToGraphObjects(object_name) {
        let temp_nodes = [];
        this.state[object_name].forEach(el => {
            let item = _.clone( el);
            item.id = object_name+'_'+el._id;

            //let graph_model = _.filter(this.state.graph_model, { 'name': object_name,});
            let graph_object = _.findLast(this.state.graph_model, { 'name': object_name,});

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

        this.state.graph_model.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.graph_model.forEach(graph_object_ => {
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

        this.state.graph_model.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.graph_model.forEach(graph_object_ => {
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
    */
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
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.clearNodes()}>Clear</Button>
                    </div>
                </div>
                <NodesLoader addNodes={this.addNodes} addRelations={this.addRelations}/>

                <div className="row">
                    <div className="col-lg-12">
                        <Nav bsStyle="tabs" justified activeKey={this.state.mode} onSelect={this.handleSelect}>
                            <NavItem eventKey="1" title="Item1">Graph</NavItem>
                            <NavItem eventKey="2" title="Item2">Table</NavItem>
                        </Nav>
                        <div>
                        {
                            this.state.mode==='1' ? (
                                <VisGraph Nodes={this.state.nodes} Edges={this.state.edges} NodeTypes={this.state.graph_model} />
                            ) : (
                                <ReactJson src={this.state.nodes} />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default GraphBuilder