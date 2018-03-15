import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as _ from "lodash";
import {BootstrapTable, ButtonGroup, TableHeaderColumn} from "react-bootstrap-table";
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './style.css';
import {strings} from "../../../../../../localization";
import {Button} from "react-bootstrap";
import {graph_data_remove_item, graph_remove} from "../../../../../../services/graph";

class NodeView extends Component {
    constructor(props) {
        super(props);
        this.createCustomToolBar = this.createCustomToolBar.bind(this);
        this.removeDataById = this.removeDataById.bind(this);
    }

    removeDataById() {
        let _id = this.props.Node._id;
        if ( typeof(_id) !== "undefined" && _id !== null ) {
            let answer = window.confirm('Вы уверены что хотите удалить объект с идентификатором #' + _id);
            if(answer) {
                graph_data_remove_item(this.props.graph_id, _id, this);
            }
        } else {
            window.alert('Необходимо выбрать узел!');
        }
    }

    createCustomToolBar(props) {
        return (
            <div>
                <div className='col-lg-6'>
                    { props.components.searchPanel }
                </div>
                <div className='col-lg-3'>
                    { props.components.btnGroup }
                </div>
                <div className='col-lg-3'>
                    <Button type="submit" bsSize="small" name="Remove" bsStyle="danger"  onClick={this.removeDataById}>
                        {strings.Remove}
                    </Button>
                </div>
            </div>
        );
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
        const options = {
            sortName: 'name',
            sortOrder: 'asc',
            toolBar: this.createCustomToolBar,
            btnGroup: this.createCustomButtonGroup
        };

        return (
            <div>
                {
                    //JSON.stringify(this.props.Node, null, 4)
                    //JSON.stringify( arrNameValue, null, 4)
                }
                <BootstrapTable data={ arrNameValue } options={options} search striped hover condensed exportCSV height='535' scrollTop={ 'Right' }>
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