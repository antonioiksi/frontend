import React, {Component} from 'react'
import {Button, ControlLabel, FormControl, PageHeader, Panel} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_data_list, graph_list, model_list, relation_list} from "../../services/graph";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {get_active_bin_with_items} from "../../services/business";

//TODO add some cool charts

class GraphDataPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            bin: {},
            bin_list: [],
            active_graph_id: 0,
            graph_id: '0',
            graph_list: [],
            graph_data: [],
            loading:false,
            error:'',
        };
        this.loadGraphData = this.loadGraphData.bind(this);
        this.selectBin = this.selectBin.bind(this);
    }

    componentWillMount() {
        graph_list(this);
        get_active_bin_with_items(this);
    }

    selectBin(event) {
        //let fieldName = event.target.name;
        let bin_id = event.target.value;
        //alert(bin_id);
        //const that = this;
        //this.setState({graph_id: fleldVal});
        //this.setState({active_graph_id:bin_id},
        //    () => {
        //        graph_data_list(bin_id, this);
        //    });

    }

    selectGraph(event) {
        //let fieldName = event.target.name;
        let graph_id = event.target.value;
        //const that = this;
        //this.setState({graph_id: fleldVal});
        this.setState({active_graph_id:graph_id},
            () => {
                graph_data_list(graph_id, this);
            });
    }

    loadGraphData() {
        alert("Don't warry, it's comming soon!");

    }

    loadCsv() {
        alert("Don't warry, it's comming soon!");
    }

    render() {
        const graph_list = this.state.graph_list;
        let arr_graph_data = []; //this.state.graph_data;
        this.state.graph_data.forEach((value, index) => {
            arr_graph_data.push({
                id: value.id,
                data: JSON.stringify(value.data, null, 2),
            })
        });
        const options = {

        };

        let bin_list = [];
        let current_bin_id = this.state.bin.id;
        this.state.bin_list.forEach((bin, index) => {
            bin_list.push({
                id: bin.id,
                name: bin.name,
            });
        });

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphData}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <Panel>
                            <h3>Выберите корзину</h3>
                            <div className="row">
                                <div className="col-lg-6">
                                    <FormControl componentClass="select" name="selectBin" onChange={this.selectBin.bind(this)}>
                                        <option>-</option>
                                        {
                                            bin_list.map((attr) =>
                                                (current_bin_id === attr.id) ? (
                                                    <option key={attr.id} value={attr.id}
                                                            selected>{attr.name}</option>
                                                ) : (
                                                    <option key={attr.id} value={attr.id}>{attr.name}</option>
                                                )
                                            )}
                                    </FormControl>
                                </div>
                                <div className="col-lg-6">
                                    <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleReset(current_bin_id)}>{strings.Reset}</Button>
                                </div>
                            </div>
                        </Panel>
                    </div>
                    <div className="col-lg-8">
                        <Panel>
                            <h3>Выберите схему данных</h3>
                            <div className="row">
                                <div className="col-lg-4">
                                    <FormControl componentClass="select" name="selectGraph" onChange={this.selectGraph.bind(this)}>
                                        <option>-</option>
                                        {graph_list.map((attr) =>
                                            <option key={attr.id} value={attr.id}>
                                                {attr.name} ({attr.graphdata_count}rows)
                                            </option>
                                        )}
                                    </FormControl>
                                </div>
                                <div className="col-lg-8">
                                    <Button  bsStyle="warning" bsSize="small" onClick={() => this.loadGraphData()}>{strings.Load}</Button>

                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel>
                            <BootstrapTable data={ arr_graph_data } options={options} search striped hover condensed exportCSV>
                                <TableHeaderColumn isKey dataField='id' width='10%' dataSort={ true }>Id</TableHeaderColumn>
                                <TableHeaderColumn dataField='data' tdStyle={{whiteSpace:'normal'}} width='90%' >Тело документа</TableHeaderColumn>
                            </BootstrapTable>
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphDataPage