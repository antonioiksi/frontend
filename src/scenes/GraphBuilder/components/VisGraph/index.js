import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as vis from "vis/index-network";
import 'vis/dist/vis-network.min.css';
import * as _ from "lodash";
import DownloadLink from "../../../../../node_modules/react-download-link/download-link";
import {strings} from "../../../../localization";
import {Button, Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {graph_data_remove_item} from "../../../../services/graph";
import NodeView from "./components/NodeView";
import GraphView from "./components/GraphView";


var optionsFA = {
    groups: {
        usergroups: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf0c0',
                size: 50,
                color: '#57169a'
            }
        },
        users: {
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf007',
                size: 50,
                color: '#aa00ff'
            }
        }
    }
};


var nodesFA = [{
    id: 1,
    label: 'User 1',
    group: 'users'
}, {
    id: 2,
    label: 'User 2',
    group: 'users'
}, {
    id: 3,
    label: 'Usergroup 1',
    group: 'usergroups'
}, {
    id: 4,
    label: 'Usergroup 2',
    group: 'usergroups'
}, {
    id: 5,
    label: 'Organisation 1',
    shape: 'icon',
    icon: {
        face: 'FontAwesome',
        code: '\uf1ad',
        size: 50,
        color: '#f0a30a'
    }
},
    {
        id: 234234,
        label: 'User 1',
    }

];

var edges = [{
    from: 1,
    to: 3
}, {
    from: 1,
    to: 4
}, {
    from: 2,
    to: 4
}, {
    from: 3,
    to: 5
}, {
    from: 4,
    to: 5
}];
edges = [];



class VisGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            current_node: {},
        };
        this.network = null;
        this.setCurrentNode = this.setCurrentNode.bind(this);

    }


    setCurrentNode(current_node) {
        this.setState({
            current_node: current_node,
        });
    }

    removeDataById() {
        //event.preventDefault();
        //alert(document.getElementById('_id').innerHTML);
        let _id = document.getElementById('_id').innerHTML;
        //graph_data_remove_item(this.props.graph_id, this.state._id, this);
        graph_data_remove_item(this.props.graph_id, _id, this);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-8">
                        <GraphView graph_id={this.props.graph_id}
                                   Nodes={this.props.Nodes}
                                   Edges={this.props.Edges}
                                   Groups={this.props.Groups}
                                   current_node={this.state.current_node}
                                   setCurrentNode={this.setCurrentNode}/>
                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-12">
                                <NodeView Node={this.state.current_node}/>
                            </div>
                            <div className="col-lg-12">
                                <div id="_id"></div>
                                <Button type="submit" bsSize="small" name="Remove"  onClick={() => this.removeDataById()}>
                                    {strings.Remove}
                                </Button>
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