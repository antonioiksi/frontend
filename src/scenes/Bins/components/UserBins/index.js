import React from 'react';
import {connect} from "react-redux";
import {Button, FormControl, Table, Form, Col, FormGroup, Panel} from "react-bootstrap";
import {bin_items, item_load, bin_reset, item_delete, bin_to_graph, bin_delete} from "../../../../services/business";
import ReactJson from 'react-json-view'
import {user_bins, bin_activate} from "../../../../services/business";
import {strings} from "../../../../localization";
import DownloadFlatData from "../DownloadFlatData/index";
import {graph_list} from "../../../../services/graph/index";
import {bin_create, bin_to_graph_extend} from "../../../../services/business/index";
import _ from "lodash";


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
    }

    changeName(event) {
        //let fieldName = event.target.name;
        let fleldVal = event.target.value;
        this.setState({new_bin_name: fleldVal});
    }

    submitForm(event) {
        event.preventDefault();
        let new_bin_name = this.state.new_bin_name;
        bin_create(new_bin_name, this);
    }


    clearBin(bin_id) {
        const bin = _.findLast(this.props.user_bins, {'id': bin_id});
        if (bin) {
            let answer = window.confirm('Вы уверены что хотите удалить все данные из корзинки ' + bin.name + ' ?');
            if(answer) {
                bin_reset(bin.id);

            }
        }

    }

    deleteBin(bin_id) {
        const bin = _.findLast(this.props.user_bins, {'id': bin_id});
        if (bin) {
            let answer = window.confirm('Вы уверены что хотите удалить корзинку ' + bin.name + ' ?');
            if(answer) {
                const sender = this;
                bin_delete(sender, bin.id);
            }
        }
    }

    selectBin(bin_id) {
        const bin = _.findLast(this.props.user_bins, {'id': bin_id});
        if (bin) {
            const sender = this;
            bin_activate( bin.id);
        }
    }


    render() {

        return(
            <div>
                {this.state.message!=='' ? (<div className="row">
                    <div className="col-lg-12">
                    {this.state.message}
                    </div>
                </div>):('')}
                <div className="row">
                    <div className="col-lg-8">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Активная</th>
                                <th>Загружено объектов</th>
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
                                        <td>{value.data_row_count}</td>
                                        <td>
                                            <Button  bsStyle="primary" bsSize="small" onClick={() => this.selectBin(value.id)}>Выбрать</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.clearBin(value.id)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.deleteBin(value.id)}>{strings.Remove}</Button>&#160;
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-lg-4">
                        <Panel>
                            <h3>Форма создания корзины</h3>
                            <Form horizontal>
                                <Col lg={8}>
                                    <FormGroup controlId="formControlsText">
                                        <FormControl type="text" placeholder={strings.InputName} name="name" onChange={this.changeName.bind(this)}/>
                                    </FormGroup>
                                </Col>
                                <Col lg={3} lgOffset={1}>
                                    <FormGroup>
                                        <Button type="submit" bsSize="small" bsStyle="success" name="Add" onClick={this.submitForm.bind(this)}>
                                            {strings.Save}
                                        </Button>
                                    </FormGroup>
                                </Col>
                            </Form>
                            </Panel>
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = function(store) {
    return {
        user_bins: store.business.user_bins,
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
    };
};


export default connect(mapStateToProps)(UserBins);