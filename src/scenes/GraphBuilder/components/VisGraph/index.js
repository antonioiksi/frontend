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


class VisGraph extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        const nds = this.props.Nodes;

        const containerFA = document.getElementById('mynetworkFA');
        if (containerFA!=null) {
            const dataFA = {
                nodes: this.props.Nodes,
                edges: this.props.Edges,
            };
            const network = new vis.Network(containerFA, dataFA, optionsFA);
            network.on("click", function (params) {
                params.event = "[original event]";

                if(params.nodes.length>0) {
                    document.getElementById('eventSpan').innerHTML = '<h2>Info:</h2>' +
                        JSON.stringify(_.findLast(nds, {'id': params.nodes[0]}), null, 4);
                }

                alert(JSON.stringify(params, null, 4));

            });
        }

        return (
            <div>
                <div className="row">
                    <div className="col-lg-10">
                        <div id="mynetworkFA"/>

                    </div>
                    <div className="col-lg-2">
                        <pre id="eventSpan"></pre>
                    </div>
                </div>
            </div>
        )
    }

}

VisGraph.PropTypes = {
    Nodes: PropTypes.array,
    Edges: PropTypes.array,
}

export default VisGraph