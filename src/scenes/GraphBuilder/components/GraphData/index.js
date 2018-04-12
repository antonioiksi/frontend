import React, {Component} from 'react'
import {Button, ControlLabel, FormControl, FormGroup, PageHeader, Panel} from "react-bootstrap";
import {strings} from "../../../../localization";
import {graph_clear, graph_data_list, graph_list, model_list, relation_list} from "../../../../services/graph";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {bin_to_graph_extend, get_active_bin_with_items} from "../../../../services/business";
import _ from "lodash";
import {connect} from "react-redux";
import {ScaleLoader} from "react-spinners";
import {Redirect} from "react-router-dom";

//TODO add some cool charts

class GraphData extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:false,

            current_bin_id: props.active_bin.id,
            current_graph_id: 0,

            graph_list: [],
            graph_data: [],

        };
        this.selectBin = this.selectBin.bind(this)
        this.selectGraph = this.selectGraph.bind(this)
        this.loadGraphData = this.loadGraphData.bind(this)
    }

    componentWillMount() {
        graph_list(this);
    }

    selectBin(event) {
        //let fieldName = event.target.name;
        let bin_id = parseInt(event.target.value);
        this.setState({current_bin_id: bin_id});
    }


    selectGraph(event) {
        let graph_id = parseInt(event.target.value);
        //const that = this;
        //this.setState({graph_id: fleldVal});
        this.setState({current_graph_id:graph_id},
            () => {
                graph_data_list(graph_id, this);
            });
    }

    loadGraphData() {
        if (this.state.current_bin_id==0) {
            alert("Необходимо выбрать корзину данных!")
        }
        if (this.state.current_graph_id==0) {
            alert("Необходимо выбрать схему данных!")
        }
        if (this.state.current_graph_id>0 && this.state.current_bin_id>0) {
            let current_graph_id = this.state.current_graph_id
            let graph = _.findLast(this.state.graph_list, {'id':current_graph_id})
            if (graph) {
                let answer = window.confirm('Вы уверены что хотите заменить все данные на схеме ' + graph.name  + ' ?')
                if(answer) {
                    let bin_pk = this.state.current_bin_id
                    let graph_pk = this.state.current_graph_id
                    const sender = this
                    bin_to_graph_extend(bin_pk, graph_pk, sender)
                }
            }
        }
    }

    render() {
        if (this.state.redirect_to_graph_builder) {
            return (<Redirect to="/graph-builder/"/>)
        }


        if(this.state.loading) {
            return (
                <ScaleLoader
                    color={'#36D7B7'}
                    loading={true}
                />
            )
        }

        const user_bins = this.props.user_bins;


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

        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        <Panel>
                            <h3>Загрузка данных на схему</h3>
                            <div className="row">
                                <div className="col-lg-5">
                                    <FormGroup>
                                        <ControlLabel>Корзина</ControlLabel>
                                        <FormControl componentClass="select" name="selectBin" onChange={this.selectBin}>
                                            <option value="0">-</option>
                                            {
                                                user_bins.map((bin) =>
                                                    (bin.active) ? (
                                                        <option key={bin.id} value={bin.id}
                                                                selected>{bin.name}</option>
                                                    ) : (
                                                        <option key={bin.id} value={bin.id}>{bin.name}</option>
                                                    )
                                                )}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                                <div className="col-lg-2" align="center">
                                    <Button  bsStyle="warning" bsSize="small" onClick={() => this.loadGraphData()}>{strings.Load} -></Button>
                                </div>
                                <div className="col-lg-5">
                                    <FormGroup>
                                        <ControlLabel>Схема</ControlLabel>
                                        <FormControl componentClass="select" name="selectGraph" onChange={this.selectGraph}>
                                            <option value="0">-</option>
                                            {graph_list.map((attr) =>
                                                <option key={attr.id} value={attr.id}>
                                                    {attr.name} ({attr.graphdata_count}rows)
                                                </option>
                                            )}
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
                {
                    /*
                    <div className="row">
                        <div className="col-lg-12">
                            <Panel>
                                <BootstrapTable data={ arr_graph_data } options={options} search striped hover condensed>
                                    <TableHeaderColumn isKey dataField='id' width='10%' dataSort={ true }>Id</TableHeaderColumn>
                                    <TableHeaderColumn dataField='data' tdStyle={{whiteSpace:'normal'}} width='90%' >Тело документа</TableHeaderColumn>
                                </BootstrapTable>
                            </Panel>
                        </div>
                    </div>
                    */
                }
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user_bins: store.business.user_bins,
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
        entity_attributes: store.business.entity_attributes,
    };
};


export default connect(mapStateToProps)(GraphData);
