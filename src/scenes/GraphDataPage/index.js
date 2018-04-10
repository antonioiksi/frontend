import React, {Component} from 'react'
import {Button, ControlLabel, FormControl, PageHeader, Panel} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_clear, graph_data_list, graph_list, model_list, relation_list} from "../../services/graph";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {get_active_bin_with_items} from "../../services/business";
import _ from "lodash";
import {connect} from "react-redux";
import {ScaleLoader} from "react-spinners";

//TODO add some cool charts

class GraphDataPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            loading:false,

            current_bin_id: 0,
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
        let bin_id = event.target.value;
        this.setState({current_bin_id: bin_id});
    }


    selectGraph(event) {
        let graph_id = event.target.value;
        //const that = this;
        //this.setState({graph_id: fleldVal});
        this.setState({current_graph_id:graph_id},
            () => {
                graph_data_list(graph_id, this);
            });
    }

    loadGraphData() {
        try {
            let current_graph_id = parseInt( this.state.current_graph_id)
            let graph = _.findLast(this.state.graph_list, {'id':current_graph_id})
            if (graph) {
                let answer = window.confirm('Вы уверены что хотите заменить все данные на схеме' + graph.name  + ' ?')
                if(answer) {
                    alert('q')
                }
            }
        } catch (ex) {
            console.log(ex.message)
        }
    }

    loadCsv() {
        alert("Don't warry, it's comming soon!");
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
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphData}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <Panel>
                            <h3>Загрузка данных на схему</h3>
                            <div className="row">
                                <div className="col-lg-5">
                                    <FormControl componentClass="select" name="selectBin" onChange={this.selectBin}>
                                        <option>-</option>
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
                                </div>
                                <div className="col-lg-2" align="center">
                                    <Button  bsStyle="warning" bsSize="small" onClick={() => this.loadGraphData()}>{strings.Load} -></Button>
                                </div>
                                <div className="col-lg-5">
                                    <FormControl componentClass="select" name="selectGraph" onChange={this.selectGraph}>
                                        <option>-</option>
                                        {graph_list.map((attr) =>
                                            <option key={attr.id} value={attr.id}>
                                                {attr.name} ({attr.graphdata_count}rows)
                                            </option>
                                        )}
                                    </FormControl>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
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


export default connect(mapStateToProps)(GraphDataPage);
