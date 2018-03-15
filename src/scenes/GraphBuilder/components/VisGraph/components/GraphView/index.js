import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as vis from "vis/index-network";
import 'vis/dist/vis-network.min.css';
import './style.css';
import * as _ from "lodash";


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



class GraphView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            nodes: [],
            edges: [],
        };
        this.network = null;
    }

    componentWillMount() {

    }


    shouldComponentUpdate(nextProps, nextState) {
        return this.props.current_node == nextProps.current_node;
    }

    render() {
        const nds = this.props.Nodes;
        const containerFA = document.getElementById('mynetworkFA');
        if (containerFA!=null) {
            const dataFA = {
                nodes: this.props.Nodes,
                edges: this.props.Edges,
            };
            const options = {
                groups: this.props.Groups,
                nodes: {
                    font:{color:'#333'},
                },
                edges: {
                    color: 'lightgray',
                    font: {
                        size:10,
                    },
                },
                physics: {
                    enabled: true,
                },
                layout: {randomSeed: 2},
                interaction:{
                    dragView: false,
                    multiselect: true
                },
            };
            console.log(`options:${JSON.stringify(options)}`);
            this.network = new vis.Network(containerFA, dataFA, options);
            const parent = this;
            this.network.on("click", function (params) {
                //alert(JSON.stringify(params, null, 4));
                params.event = "[original event]";
                if(params.nodes.length>0) {
                    let json_object = _.findLast(nds, {'id': params.nodes[0]});
                    //alert(json_object._id);
                    //this.sender.setState({_id: json_object._id});
                    //document.getElementById('_id').innerHTML = json_object._id;
                    let current_node = _.findLast(nds, {'id': params.nodes[0]});
                    parent.props.setCurrentNode(current_node);
                    //parent.setState({current_node: current_node});
                    //document.getElementById('eventSpan').innerHTML = '<h2>Info:</h2>' +
                    //    JSON.stringify(_.findLast(nds, {'id': params.nodes[0]}), null, 4);
                    // draw image
                    //if (json_object.image)
                    //    document.getElementById('eventSpan').innerHTML += '<img src="'+json_object.image+'"/>'
                }
            });

            this.network.on("afterDrawing", function (ctx) {
                //var dataURL = ctx.canvas.toDataURL();
                //document.getElementById('canvasImg').src = dataURL;
                //document.getElementById('aaa').exportFile = dataURL;
                //<img id="canvasImg" alt="Right click to save me!"/>
            });
        }

        return (
            <div>
                <div className="row">
                    <div id="mynetworkFA"/>
                </div>
            </div>
        )
    }

}

GraphView.PropTypes = {
    graph_id: PropTypes.int,
    Nodes: PropTypes.array,
    Edges: PropTypes.array,
    Groups: PropTypes.object,
    setCurrentNode: PropTypes.func,
    current_node: PropTypes.object,
};

export default GraphView;