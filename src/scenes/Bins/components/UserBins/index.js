import React from 'react';
import {connect} from "react-redux";
import {Button, FormControl, Table, Form, Col, FormGroup} from "react-bootstrap";
import {bin_items, item_load, bin_reset, item_delete, bin_to_graph} from "../../../../services/business";
import ReactJson from 'react-json-view'
import {user_bins, bin_activate} from "../../../../services/business";
import {strings} from "../../../../localization";
import DownloadFlatData from "../DownloadFlatData/index";
import {graph_list} from "../../../../services/graph/index";
import {bin_create, bin_to_graph_extend} from "../../../../services/business/index";


class UserBins extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            message: '',
            bin_items : [],
            bin_pk: null,
            new_bin_name: '',
            item : {},
            graph_list: [],
            form: {
                selectGraph:''
            },

        }
    }

    componentWillMount() {
        user_bins();
        graph_list(this);
    }

    changeName(event) {
        //let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({new_bin_name: fleldVal});
    }

    submitForm(event) {
        event.preventDefault();
        let new_bin_name = this.state.new_bin_name;
        //graph_create(graph_data, this);
        bin_create(new_bin_name, this);
        alert('sss');
        //
        //alert('okay');
    }


    handleReset(bin_pk) {
        let answer = window.confirm('Вы уверены что хотите очистить корзинку с ID '+bin_pk +' ?');
        if(answer) {
            bin_reset(bin_pk);
        }
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleLoad(bin_pk) {
        //console.log('bin_pk' + bin_pk);
        bin_items(this, bin_pk)
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleActivate(bin_pk) {
        bin_activate(this, bin_pk)
    }


    handleItemLoad(item_pk) {
        //console.log('item_pk' + item_pk);
        item_load(this, item_pk);
        /*this.setState({
                values: this.state.values.filter((_,i) => i !== removeId)
            },
            () => {this.props.changeFormValues(this.props.index, this.state.values)}
        );*/
    }

    handleItemDelete(item_pk) {

        item_delete(this, this.state.bin_pk, item_pk);
    }


    selectGraph(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;

        this.setState({form: {...this.state.form, [fieldName]: fleldVal, selectTextValue: fleldVal}});
        //alert(fleldVal);
    }

    loadToGraph(bin_pk) {
        let graph_pk = this.state.form.selectGraph;
        if(graph_pk==='') {
            alert('Необходимо выбрать Graph');
        }
        else {

            bin_to_graph(bin_pk, graph_pk, this);
        }
    }

    loadToGraphAndExtend(bin_pk) {
        let graph_pk = this.state.form.selectGraph;
        if(graph_pk==='') {
            alert('Необходимо выбрать Graph');
        }
        else {

            bin_to_graph_extend(bin_pk, graph_pk, this);
        }
    }


    render() {

        console.log(this.props.user_bins);
        const graph_list = this.state.graph_list;

        return(
            <div>
                {this.state.message!=='' ? (<div className="row">
                    <div className="col-lg-12">
                    {this.state.message}
                    </div>
                </div>):('')}
                <div className="row">
                    <div className="col-lg-4">
                        <Form horizontal>
                            <Col lg={8}>
                                <FormGroup controlId="formControlsText">
                                    <FormControl type="text" placeholder={strings.Name} name="name" onChange={this.changeName.bind(this)}/>
                                </FormGroup>
                            </Col>
                            <Col lg={3} lgOffset={1}>
                                <FormGroup>
                                    <Button type="submit" bsSize="small" name="Add" onClick={this.submitForm.bind(this)}>
                                        {strings.Save}
                                    </Button>
                                </FormGroup>
                            </Col>
                        </Form>
                    </div>
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Active}</th>
                                <th>{strings.Count}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.user_bins.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.active ? <i className="fa fa-check-square-o" aria-hidden="true"></i> : ''}</td>
                                        <td>{value.items_count}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleReset(value.id)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleLoad(value.id)}>{strings.Load}</Button>&#160;
                                            <Button  bsStyle="success" bsSize="small" onClick={() => this.handleActivate(value.name)}>{strings.Activate}</Button>&#160;
                                            <Button  bsStyle="primary" bsSize="small" onClick={() => this.loadToGraph(value.id)}>{strings.Load} for graph</Button>&#160;
                                            <Button  bsStyle="primary" bsSize="small" onClick={() => this.loadToGraphAndExtend(value.id)}>{strings.Load} for graph and extend</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>

                        <FormControl componentClass="select" name="selectGraph" onChange={this.selectGraph.bind(this)}>
                            <option>- выберите граф для загрузки -</option>
                            {graph_list.map((attr) =>
                                <option key={attr.name} value={attr.id}>
                                    {attr.name}
                                </option>
                            )}
                        </FormControl>
                        <br/><br/><br/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Id</th>
                                <th>Url</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.bin_items.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.id}</td>
                                        <td>{value.url}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleItemDelete(value.id)}>{strings.Delete}</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleItemLoad(value.id)}>{strings.Load}</Button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {
                            Object.keys(this.state.item).length !== 0 ? (
                                <DownloadFlatData binItem_data={this.state.item}/>
                            ) : (
                                ''
                            )
                        }

                        <ReactJson src={this.state.item}  />
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user_bins: store.business.user_bins,
    };
};


export default connect(mapStateToProps)(UserBins);