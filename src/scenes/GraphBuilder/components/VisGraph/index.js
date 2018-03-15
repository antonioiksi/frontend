import React, {Component} from 'react';
import PropTypes from 'prop-types';

import 'vis/dist/vis-network.min.css';
import NodeView from "./components/NodeView";
import GraphView from "./components/GraphView";
import {FormControl, FormGroup} from "react-bootstrap";
import * as _ from "lodash";


class VisGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            current_node: {},
            searchValue: '',
        };
        this.setCurrentNode = this.setCurrentNode.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(e) {
        this.setState({ searchValue: e.target.value });


    }

    setCurrentNode(current_node) {
        this.setState({
            current_node: current_node,
        });
    }

    render() {
        //alert('hi');
        let nodes = [];
        let searchValue = this.state.searchValue.toLowerCase();
        if (this.state.searchValue !== '') {
            nodes = _.filter(this.props.Nodes, function(obj) {
                return obj.label.toLowerCase().indexOf(searchValue) !== -1;
            });
        } else {
            nodes = this.props.Nodes;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-lg-3">
                        <FormGroup
                            controlId="formBasicText"
                        >
                            <FormControl
                                type="text"
                                value={this.state.searchValue}
                                placeholder="Search in graph"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-8">
                        <GraphView graph_id={this.props.graph_id}
                                   Nodes={nodes}
                                   Edges={this.props.Edges}
                                   Groups={this.props.Groups}
                                   current_node={this.state.current_node}
                                   setCurrentNode={this.setCurrentNode}/>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <NodeView Node={this.state.current_node} graph_id={this.props.graph_id}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

VisGraph.PropTypes = {
    graph_id: PropTypes.int,
    Nodes: PropTypes.array,
    Edges: PropTypes.array,
    Groups: PropTypes.object,

};

export default VisGraph;