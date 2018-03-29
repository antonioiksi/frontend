import React, {Component} from 'react'
import {Button, FormControl, PageHeader, Panel} from "react-bootstrap";
import {strings} from "../../localization";
import BinData from "./components/BinData";
import {bin_reset, get_active_bin_with_items, item_delete} from "../../services/business";
import ActiveBinManager from "../../components/business/ActiveBinManager";

import {graph_data_list, graph_list} from "../../services/graph";

//TODO add some cool charts

class BinDataPage extends Component {

    constructor(props) {
        super(props);
        this.state={
            bin: {},
            bin_list: [],
            bin_items: [],
            loading:false,
            error:'',
        };
        this.selectBin = this.selectBin.bind(this);
        this.removeBinItem = this.removeBinItem.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.loadCSV= this.loadCSV.bind(this);
    }

    componentWillMount() {
        //bin_list(this);
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

    handleReset(bin_pk) {
        let answer = window.confirm('Вы уверены что хотите очистить корзинку с ID '+bin_pk +' ?');
        if(answer) {
            bin_reset(bin_pk);
        }
    }

    loadCSV() {
        alert("Don't worry, it's comming soon!");
    }

    removeBinItem(item_pk) {
        item_delete(this, this.state.bin.id, item_pk);
    }

    render() {
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
                        <PageHeader>{strings.ActiveBinData}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <ActiveBinManager/>
                    </div>
                    <div className="col-lg-8">
                        <Panel>
                            <h3>Действия с данными</h3>
                            <div className="row">
                                <div className="col-lg-12">
                                    <Button  bsStyle="success" bsSize="small" onClick={this.loadCSV}>{strings.LoadCsv}</Button>&#160;&#160;
                                    <a href="/search"><Button  bsStyle="primary" bsSize="small">Перейти к поиску</Button></a>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <BinData Bin={this.state.bin} BinItems={this.state.bin_items} removeBinItem={this.removeBinItem}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BinDataPage