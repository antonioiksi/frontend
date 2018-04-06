import React from "react";
import {ScaleLoader} from "react-spinners";
import {load_graph_data} from "../../../../../services/graph";
import csv from "csv/lib/index";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {load_json} from "../../../../../services/business";
import * as alertsActions from "../../../../../services/alerts/actions";
import store from "../../../../../store";

class CsvLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleFileSelect(evt) {
        let graph_name = evt.target.name;
        let files = evt.target.files;
        if (!files.length) {
            alert('No file select');
            return;
        }
        const sender = this;
        const reader = new FileReader();
        reader.onload = () => {
            // http://csv.adaltas.com/parse/examples/

            sender.setState({
                loading: true,
            }, () => {
                csv.parse(reader.result, {columns: true, delimiter: ';'}, (err, data) => {
                    if(err) {
                        //console.log(err.message);
                        //this.setState({message:err.message})
                        const mes = err.message

                        sender.setState({loading:false}, () => {
                            store.dispatch(alertsActions.add({
                                id: new Date().getTime(),
                                type: "danger",
                                message: "Ошибка, разбора файла CSV! " + mes,
                            }));
                        })
                    } else {
                        //console.log(data);
                        if(sender.props.active_bin) {
                            sender.setState({
                                loading: true,
                            }, () => {
                                load_json(sender.props.active_bin.id, data, sender);
                            })
                        }
                    }
                });
            });


        };
        //reader.readAsBinaryString(files[0]);
        //reader.readAsBinaryString(files[0],'utf8');
        //reader.readAsText(files[0],'CP1251');
        reader.readAsText(files[0],'utf8');
        /*
        reader.readAsBinaryString(e[0]);
        let reader = new FileReader();
        reader.onload = function(e) {
            console.log( reader.result);
            //that.loadData(e.target.result);
            //load_graph_data(graph_name, json_data, sender);
        };
        reader.readAsText(files[0]);*/

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

        return (
            <div>
                <FormGroup>
                    <ControlLabel>Выберите CSV файл с разделителем ';'</ControlLabel>
                    <FormControl type="file" name="param" onChange={this.handleFileSelect} />
                </FormGroup>
            </div>
        )
    }
}

export default CsvLoader;
