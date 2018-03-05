import React, {Component} from 'react';
import PropTypes from 'prop-types';

import * as vis from "vis/index-network";
import 'vis/dist/vis-network.min.css';
import './style.css';
import * as _ from "lodash";
import DownloadLink from "../../../../../node_modules/react-download-link/download-link";
import {strings} from "../../../../localization";
import {Button} from "react-bootstrap";
import {graph_data_remove_item} from "../../../../services/graph";


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
        };

    }

    removeDataById() {
        //event.preventDefault();
        //alert(document.getElementById('_id').innerHTML);
        let _id = document.getElementById('_id').innerHTML;
        //graph_data_remove_item(this.props.graph_id, this.state._id, this);
        graph_data_remove_item(this.props.graph_id, _id, this);
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
                }
            };
            console.log('options');
            console.log(options);

            const network = new vis.Network(containerFA, dataFA, options);
            network.sender = this;

            network.on("click", function (params) {
                params.event = "[original event]";

                if(params.nodes.length>0) {

                    let json_object = _.findLast(nds, {'id': params.nodes[0]});
                    //alert(json_object._id);
                    //this.sender.setState({_id: json_object._id});
                    document.getElementById('_id').innerHTML = json_object._id;


                    document.getElementById('eventSpan').innerHTML = '<h2>Info:</h2>' +
                        JSON.stringify(_.findLast(nds, {'id': params.nodes[0]}), null, 4);
                    // draw image
                    if (json_object.image)
                        document.getElementById('eventSpan').innerHTML += '<img src="'+json_object.image+'"/>'
                }
                //alert(JSON.stringify(params, null, 4));
            });



            network.on("afterDrawing", function (ctx) {
                //var dataURL = ctx.canvas.toDataURL();
                //document.getElementById('canvasImg').src = dataURL;
                //document.getElementById('aaa').exportFile = dataURL;
                //<img id="canvasImg" alt="Right click to save me!"/>

            });
        }

        return (
            <div>
                <div className="row">
                    <div className="col-lg-8">
                        <div id="mynetworkFA"/>

                    </div>
                    <div className="col-lg-4">
                        <div className="row">
                            <div className="col-lg-8">
                                Search string <div id="_id"></div>
                            </div>
                            <div className="col-lg-4">
                                <Button type="submit" bsSize="small" name="Remove"  onClick={() => this.removeDataById()}>
                                    {strings.Remove}
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <pre id="eventSpan"></pre>
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
}

export default VisGraph