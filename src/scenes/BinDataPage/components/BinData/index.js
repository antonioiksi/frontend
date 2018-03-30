import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {strings} from "../../../../localization";
import {Button, Table, Well} from "react-bootstrap";
import {bin_items, item_delete, item_load} from "../../../../services/business";
import ItemData from "../ItemData";
import {graph_remove} from "../../../../services/graph";

//TODO add some cool charts

class BinData extends Component {

    constructor(props) {
        super(props);
        this.state={
            item:{},
            loading:false,
            error:'',
        };
        this.handleItemLoad = this.handleItemLoad.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);

    }

    handleItemLoad(item_pk) {
        item_load(this, item_pk);
    }

    handleItemDelete(i, item_pk) {
        let answer = window.confirm('Вы уверены что хотите запрос под номером ' + i + ' ?');
        if(answer) {
            this.props.removeBinItem(item_pk);

        }

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th className="col-lg-1">#</th>
                                <th className="col-lg-7">Запрос</th>
                                <th className="col-lg-2">Количество документов</th>
                                <th className="col-lg-2"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.BinItems.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{JSON.stringify( value.jsonQuery, null, 2)}</td>
                                        <td>{ value.doc_count }</td>
                                        <td>
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleItemLoad(value.id)}>{strings.Load}</Button>&#160;
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleItemDelete(i+1, value.id)}>{strings.Delete}</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                {
                    this.state.item.data!=null ? (
                        <ItemData Item={this.state.item}/>
                    ):('')
                }
            </div>
        )
    }
}

BinData.PropTypes = {
    Bin: PropTypes.object.isRequired,
    BinItems: PropTypes.array,
    removeBinItem: PropTypes.func,
};

export default BinData