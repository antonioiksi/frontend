import React, {Component} from 'react'
import {Button, Panel} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {bin_activate, user_bin_items} from "../../../../services/business";
import _ from 'lodash';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import format from 'string-format';

//TODO add some cool charts



class LastQueries extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_bin_items: [],
            redirect_to_search: false,
            redirect_to_active_bin_data: false,
        };

        this.cellButtons = this.cellButtons.bind(this);
        this.formatEntityAttribute = this.formatEntityAttribute.bind(this);
        //this.ActivateBinThenGoToTheData = this.ActivateBinThenGoToTheData.bind(this);
    }

    componentWillMount() {
        const sender = this;
        user_bin_items(sender);
    }

    ActivateBinThenGoToSearch(cell, row, rowIndex) {
        const sender = this;
        bin_activate(row.bin_id, sender, {redirect_to_search: true});
    }
    ActivateBinThenGoToTheData(cell, row, rowIndex) {
        const sender = this;
        bin_activate(row.bin_id, sender, {redirect_to_active_bin_data: true});
    }

    cellButtons(cell, row, enumObject, rowIndex) {
        return (
            <div>
                <Button bsStyle="primary" onClick={()=> this.ActivateBinThenGoToTheData(cell, row, rowIndex)}>Данные</Button>&#160;&#160;
                <Button bsStyle="info" onClick={() => this.ActivateBinThenGoToSearch(cell, row, rowIndex)}>Поиск</Button>
            </div>
        )
    }

    formatEntityAttribute(cell, row) {
        let res = "";
        this.props.entity_attributes.forEach((item) => {
            if (cell[item.name])
                res += format("<b>{}</b>: {}<br/>", item.title, cell[item.name]);
        });
        return res;
    }

    render() {
        if (this.state.redirect_to_search) {
            return (<Redirect to="/search/"/>)
        }
        if (this.state.redirect_to_active_bin_data) {
            return (<Redirect to="/active-bin-data/"/>)
        }

        const listData = _.transform( this.state.user_bin_items, (result, value, key) => {
            result.push({
                id: value.id,
                datetime: value.datetime,
                bin_id: value.bin.id,
                bin_name: value.bin.name,
                jsonQuery: value.jsonQuery,
                doc_count: value.doc_count,
            });
        });

        const options = {
            sizePerPage: 10,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'bottom',
            sortName: 'datetime',
            sortOrder: 'desc',

        };

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <h3>
                                Последние запросы
                            </h3>
                            <BootstrapTable data={ listData } options={options} striped search hover condensed>
                                <TableHeaderColumn isKey dataField='id' width="10%">Ид</TableHeaderColumn>
                                <TableHeaderColumn dataField='datetime'  dataSort={ true }>Время</TableHeaderColumn>
                                <TableHeaderColumn dataField='bin_name'  dataSort={ true }>Корзинка</TableHeaderColumn>
                                <TableHeaderColumn dataField='jsonQuery' tdStyle={{whiteSpace:'normal'}} filter={ {type: 'TextFilter', delay: 1000} } filterFormatted={true} dataFormat={this.formatEntityAttribute}  dataSort={ true }>Запрос</TableHeaderColumn>
                                <TableHeaderColumn dataField='doc_count' headerAlign='center' dataAlign='right' width='100' >Найдено</TableHeaderColumn>
                                <TableHeaderColumn dataField='button' dataFormat={this.cellButtons} export={ false } >Action</TableHeaderColumn>
                            </BootstrapTable>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = function(store) {
    return {
        entity_attributes: store.business.entity_attributes,
        /*
        entity_attributes: _.reduce( store.business.entity_attributes, (hash, value) => {
                let key = value['name'];
                hash[key] = value['title'];
                return hash;}, {}),
        */
    };
};

export default connect(mapStateToProps)(LastQueries);

