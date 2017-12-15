import React, {Component} from 'react'
import {Button, ControlLabel, FormControl, Nav, NavItem, PageHeader} from "react-bootstrap";
import VisGraph from "./components/VisGraph";
import {strings} from "../../localization/index";
import {model_list} from "../../services/graph";
import * as _ from "lodash";
import ReactJson from 'react-json-view'
import './style.css';
import {graph_list, graph_nodes_by_models, relation_list} from "../../services/graph/index";
import NodesLoader from "./components/NodesLoader";

//TODO add some cool charts

class GraphBuilder extends Component {

    constructor(props) {
        super(props)


        this.state = {
            graph_name: '-',
            graph_list: [],
            model_list: [],
            relation_list: [],
            nodes: [],
            edges: [],
            mode: '1',
            duration: '',
        }

        this.handleSelect = this.handleSelect.bind(this);
        this.addNodes = this.addNodes.bind(this);
        this.addRelations = this.addRelations.bind(this);
    }

    componentWillMount() {
        graph_list(this);
        model_list(this);
        relation_list(this);
    }

    selectGraph(event) {
        //let fieldName = event.target.name;
        let fleldVal = event.target.value;

        this.setState({graph_name: fleldVal});
        //alert(fleldVal);
    }

    addNodes(model_names) {
        //graph_nodes_by_models(['phoneA','phoneB'], this);
        //graph_nodes_by_models(['person'], this);
        const graph_name = this.state.graph_name;
        if(graph_name==='-') {
            alert('Необходимо выбрать Graph');
        }
        else {
            if(model_names.length===0) {
                alert('Необходимо определить хотя бы одну модель');
            } else {
                graph_nodes_by_models(graph_name, model_names, this);
            }

        }

        /*
        this.setState({
           nodes: [...this.state.nodes, nodes]

        });*/
    }

    addRelations(relation_names) {
        const t0 = window.performance.now();

        if(relation_names.length===0) {
            alert("Необходимо выбрать связь, но не более одной!")
            return;
        } else if (relation_names.length>1) {
            alert("Нельзя загружать одновременно более одной связи!")
            return;
        }

        const rel_name = relation_names[0];
        const rel = _.find(this.state.relation_list, {name: rel_name});
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
        const t1 = performance.now();
        //console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

        this.setState({
            edges: this.state.edges.concat(temp_edges),
            duration: t1 - t0,
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

            //let model_list = _.filter(this.state.model_list, { 'name': object_name,});
            let graph_object = _.findLast(this.state.model_list, { 'name': object_name,});

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

        this.state.model_list.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.model_list.forEach(graph_object_ => {
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

        this.state.model_list.forEach(graph_object => {

            let graph_object_name = graph_object.name;

            this.state.model_list.forEach(graph_object_ => {
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
        const graph_list = this.state.graph_list;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphBuilder} {this.state.duration}</PageHeader>
                    </div>
                </div>


                <div className="row">
                    <div className="col-lg-12">
                        <ControlLabel>{strings.Graph}</ControlLabel>
                        <FormControl componentClass="select" name="selectGraph" onChange={this.selectGraph.bind(this)}>
                            <option>-</option>
                            {graph_list.map((attr) =>
                                <option key={attr.name} value={attr.name}>
                                    {attr.name} ({attr.graphdata_count}rows)
                                </option>
                            )}
                        </FormControl>
                        <br/>
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
                                <VisGraph Nodes={this.state.nodes} Edges={this.state.edges} NodeTypes={this.state.model_list} />
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