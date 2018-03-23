import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {strings} from "../../../../localization";
import {Button, Panel, Table, Well} from "react-bootstrap";
import {bin_items} from "../../../../services/business";

//TODO add some cool charts

class ItemData extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:false,
            error:'',
        };
    }


    render() {
        let data = this.props.Item.data;
        if (data==null)
            data = [];
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h3>Результат запроса</h3>
                        <Panel>
                            {JSON.stringify( this.props.Item.query, null, 2)}
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Тип документа</th>
                                <th>Тело документа</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{ value._type }</td>
                                        <td>{JSON.stringify( value._source, null, 2)}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" disabled={true} >{strings.Delete}</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

ItemData.PropTypes = {
    Item: PropTypes.object.isRequired,
};

export default ItemData