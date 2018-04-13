import React from 'react';
import './esinfo.css';
import {Label, Panel} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {HashLoader} from "react-spinners";
import {info} from "../../../../services/elastic";



class ESInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            es:{},

        }
    }

    componentWillMount() {

        info(this)
    }

    render() {
        let es_json = null;
        if(Object.keys(this.state.es).length>0) {
            es_json = this.state.es;
        }
        let arrIndices = [];



        if(this.state.es.indices) {
            this.state.es.indices.forEach((item, index)=> {
                let mapIndexAliases = this.state.es.aliases[item['index']];
                let indexName = Object.keys(mapIndexAliases['aliases']).shift();
                if(indexName && indexName.length>0) {
                    arrIndices.push({
                        index: indexName,
                        docs: item['docs.count'],
                    });
                }
            });
        }
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
        //<i className="fa fa-server fa-5x {es_json.cluster.status}"></i>

        return (
            <div>
                {
                    es_json!=null? (
                        <div className="row">
                            <div className="col-lg-6">
                                <Panel>
                                    <h3>
                                        Поисковая система ElasticSearch
                                    </h3>
                                    <p className="es-info">Название кластера <Label bsStyle="success">{es_json.cluster!=null? ( es_json.cluster.cluster_name):''}</Label></p>
                                    <p className="es-info">Количество поисковых серверов (узлов) <Label bsStyle="success">{es_json.cluster!=null? ( es_json.cluster.number_of_nodes):''}</Label></p>
                                    <p className="es-info">Количество загруженных таблиц <Label bsStyle="success">{es_json.indices!=null? ( es_json.indices.length):''}</Label></p>
                                    <p className="es-info">Количество загруженных документов <Label bsStyle="success">{es_json.count!=null? ( es_json.count[0].count):''}</Label></p>

                                </Panel>
                            </div>
                            <div className="col-lg-6">
                                <Panel>
                                    <h3>
                                        Информация о загруженных таблицах
                                    </h3>
                                    <BootstrapTable data={ arrIndices } options={options} pagination search striped hover condensed scrollTop={ 'Right' }>
                                        <TableHeaderColumn isKey dataField='index'  dataSort={ true }>Название</TableHeaderColumn>
                                        <TableHeaderColumn dataField='docs'  dataSort={ true }>Кол-во документов</TableHeaderColumn>
                                    </BootstrapTable>

                                </Panel>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-lg-12 hashloader" align="center">
                                <HashLoader
                                    color={'#36D7B7'}
                                    loading={this.state.loading}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default ESInfo;