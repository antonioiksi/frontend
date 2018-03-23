import React, {Component} from 'react'
import {Button, Panel} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

//TODO add some cool charts


class LastQueries extends Component {

    constructor(props) {
        super(props);

        this.ActionOne = this.ActionOne.bind(this);
    }

    ActionOne(cell, row) {
        return (
            <div>
                <a href={'/active-bin-data/'}><Button bsStyle="primary">Просмотр данных</Button></a>&#160;&#160;
                <a href={'/active-bin-data/'}><Button bsStyle="primary">Найти еще</Button></a>&#160;&#160;
            </div>
        )
    }

    render() {
        const listData = [
            {
                index: 1,
                bin: 'Корзинка 1',
                bin_id: 1,
                query: 'ФИО: Петров, год рождения: 1980, email:asdasdasd@google.com',
                result_count: '50',
            },
            {
                index: 2,
                bin: 'Корзинка 2',
                bin_id: 2,
                query: 'Телефон: 2452353255',
                result_count: '50',
            },
            {
                index: 3,
                bin: 'Корзинка 1',
                bin_id: 1,
                query: 'Телефон: 678768676787',
                result_count: '50',
            },
            {
                index: 4,
                bin: 'Корзинка 3',
                bin_id: 3,
                query: 'ФИО: Сидоров',
                result_count: '50',
            },
        ];

        const options = {
            sizePerPage: 10,
            pageStartIndex: 0,
            paginationSize: 3,
            prePage: 'Prev',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            paginationPosition: 'bottom',
            sortName: 'index',
            sortOrder: 'asc',

        };

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <h3>
                                Последние запросы
                            </h3>
                            <BootstrapTable data={ listData } options={options} striped hover condensed>
                                <TableHeaderColumn isKey dataField='index' >Корзинка</TableHeaderColumn>
                                <TableHeaderColumn dataField='bin'  dataSort={ true }>Корзинка</TableHeaderColumn>
                                <TableHeaderColumn dataField='query' tdStyle={{whiteSpace:'normal'}}  dataSort={ true }>Запрос</TableHeaderColumn>
                                <TableHeaderColumn dataField='result_count' headerAlign='center' dataAlign='right' width='100' >Найдено</TableHeaderColumn>
                                <TableHeaderColumn dataField='action' dataFormat={this.ActionOne} export={ false } >Action</TableHeaderColumn>
                            </BootstrapTable>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

export default LastQueries

