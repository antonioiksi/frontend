import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './style.css';

class NodeView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let arrNameValue = [];
        let node = this.props.Node;
        Object.keys(node).forEach(function(key, ) {
            arrNameValue.push({
                id: key,
                name: key,
                value: node[key],
            });
        });
        let options = {
            sortName: 'name',
            sortOrder: 'asc'
        };

        return (
            <div>
                {
                    //JSON.stringify(this.props.Node, null, 4)
                    //JSON.stringify( arrNameValue, null, 4)
                }
                <BootstrapTable data={ arrNameValue } options={options} search striped hover condensed exportCSV>
                    <TableHeaderColumn isKey dataField='name'  dataSort={ true }>Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='value'  dataSort={ true }>Value</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

NodeView.PropTypes = {
    Node: PropTypes.object,
};

export default NodeView;