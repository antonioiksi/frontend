import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {
    Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, Modal, OverlayTrigger, Panel, Popover, ToggleButton,
    ToggleButtonGroup, Tooltip
} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";
import {strings} from "../../../localization";
import _ from "lodash";
import {bin_items, bin_items_data, item_data_remove} from "../../../services/business";
import {connect} from "react-redux";
import {BootstrapTable, DeleteButton, TableHeaderColumn} from "react-bootstrap-table";
import format from "string-format";


const VIEW_MODES = {TABLE:'table', TABLE_EXPORT: 'table_export', JSON:'json', };


function prettyPrint(ugly) {
    //var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}

class BinData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view_mode : VIEW_MODES.TABLE,
            loading:false,
            bin_items_data: [],

        }

        this.formatEntityAttribute = this.formatEntityAttribute.bind(this);

    }

    componentWillMount() {
        const sender = this;
        if(this.props.active_bin) {
            this.setState({
                loading: true,
            }, () => {
                bin_items_data(this.props.active_bin.id, sender);
            })

        }
    }

    componentWillReceiveProps(nextProps) {
        const sender = this;
        if(this.props.active_bin) {
            if (this.props.active_bin.id !== nextProps.active_bin.id) {
                this.setState({
                    loading: true,
                }, () => {
                    bin_items_data(this.props.active_bin.id, sender);
                })
            }
        }
    }

    handleDeleteButtonClick = (onClick) => {
        //console.log(onClick);
        //alert('delete')
        onClick();
    }

    createCustomDeleteButton = (onBtnClick) => {
        return (
            <Button bsStyle="danger" onClick={ e => this.handleDeleteButtonClick(onBtnClick)}>Удалить</Button>
        )
    }


    remoteDelete = (row) => {
        console.log(row);
        const sender = this;
        this.setState({
            loading: true,
        }, () => {
            item_data_remove(this.props.active_bin.id, row, sender);
        })
    }

    formatEntityAttribute(cell, row) {
        let res = "";
        const jsonCell = JSON.parse(cell);
        this.props.entity_attributes.forEach((item) => {
            let value = jsonCell[item.name];
            if (value)
                res += format("<b>{}</b>: {}<br/>", item.title, value.join(','));
        });
        return res;
    }

    formatSource(cell, row) {
        let res = "";
        const jsonCell = JSON.parse(cell);

        Object.keys(jsonCell).sort().forEach((key) => {
            let value = jsonCell[key];
            if (value)
                res += format("<b>{}</b>: {}, ", key, value);
        });
        return res;
    }

    render() {

        if(this.state.loading) {
            return (
                <ScaleLoader
                    color={'#36D7B7'}
                    loading={true}
                />
            )
        }

        let table_data = [];
        this.state.bin_items_data.forEach((item, index) => {
            let table_item = {};
            table_item['_source'] = JSON.stringify( item._source, null, 4);
            //table_item['_data_system_source'] = JSON.stringify( item._data_system_source, null, 4);
            table_item['_first_level_source'] = JSON.stringify( item._first_level_source, null, 4);
            table_item['_item_id'] = item._item_id;
            table_item['_id'] = item._id;
            table_item['_aliase'] = item._aliase;
            table_item['key'] = item._item_id + '_' + item._id;
            table_data.push(table_item);
        });

        const selectRowProp = {
            mode: 'checkbox',
            bgColor: 'pink',
        }


        const options = {

            //deleteBtn: this.createCustomDeleteButton,
            onDeleteRow: this.remoteDelete,
            deleteBtn: this.createCustomDeleteButton,
            handleConfirmDeleteRow: function(cb, dropRowKeys) {
                let answer = window.confirm('Вы уверены что хотите удалить выбранные объекты?');
                if(answer) {
                    cb();
                }
            }
        };


        return (
            <div>

                <div className="row">
                    <div className="col-lg-12">
                        <BootstrapTable selectRow={ selectRowProp } data={ table_data } options={ options } striped search condensed deleteRow={ true }>
                            <TableHeaderColumn isKey dataField='key' width="10%">Ид</TableHeaderColumn>
                            <TableHeaderColumn dataField='_aliase' headerAlign='center'>Таблица</TableHeaderColumn>
                            <TableHeaderColumn dataField='_first_level_source' headerAlign='center' filter={ {type: 'TextFilter', delay: 1000} } filterFormatted={true} dataFormat={this.formatEntityAttribute} >Данные верхнего уровня</TableHeaderColumn>
                            <TableHeaderColumn dataField='_source' headerAlign='center' filter={ {type: 'TextFilter', delay: 1000} } filterFormatted={true} dataFormat={this.formatSource} >Исходные данные</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
                </div>
            </div>
        )
    }
}

BinData.PropTypes = {
};

const mapStateToProps = function(store) {
    return {
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
        entity_attributes: store.business.entity_attributes,
    };
};


export default connect(mapStateToProps)(BinData);
