import React, {Component} from 'react';
import {strings} from "../../../localization";
import {Button, ControlLabel, FormControl, FormGroup, Modal, Panel} from "react-bootstrap";
import {connect} from "react-redux";
import * as alertsActions from "../../../services/alerts/actions";
import store from "../../../store";
import _ from 'lodash';
import {bin_activate, bin_create, bin_delete, bin_reset} from "../../../services/business";


class ActiveBinManager extends Component {
    constructor(props) {
        super(props);

        this.state={
            showModal: false,
            textValue: "",
        };
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeText = this.changeText.bind(this);
        this.createBin = this.createBin.bind(this);
    }

    selectBin(event) {
        let fieldName = event.target.name;
        let fleldVal = event.target.value;
        const bin = _.findLast(this.props.user_bins, {'id': parseInt(fleldVal)});
        if (bin) {
            const sender = this;
            bin_activate( bin.id);
        }

        //console.log(value);
        //alert('selectBin');
    }

    clearBin() {
        let answer = window.confirm('Вы уверены что хотите удалить все данные из корзинки ' + this.props.active_bin.name + ' ?');
        if(answer) {
            bin_reset(this.props.active_bin.id);

        }
    }

    deleteBin() {
        let answer = window.confirm('Вы уверены что хотите удалить корзинку ' + this.props.active_bin.name + ' ?');
        if(answer) {
            const sender = this;
            bin_delete(sender, this.props.active_bin.id);
        }
    }

    showModal() {
        this.setState({showModal:true});
    }

    closeModal() {
        this.setState({
            showModal:false
        });
    }

    changeText(event) {
        event.preventDefault();
        const value = event.target.value;
        this.setState({
            textValue: value,
        })

    }

    createBin() {
        const sender = this;
        bin_create( this.state.textValue, sender);
    }

    render() {
        const user_bins = this.props.user_bins;
        const current_bin_id = 0;

        return(
            <Panel>
                <h3>Выберите корзину</h3>
                <div className="row">
                    <div className="col-lg-4">
                        <FormControl componentClass="select" name="selectBin" onChange={this.selectBin.bind(this)}>
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
                    <div className="col-lg-8">
                        <Button  bsStyle="danger" bsSize="small" onClick={() => this.clearBin()}>{strings.Reset}</Button>&#160;
                        <Button  bsStyle="danger" bsSize="small" onClick={() => this.deleteBin()}>Удалить корзинку</Button>&#160;
                        <Button  bsStyle="primary" bsSize="small" onClick={() => this.showModal()}>Создать новую корзинку</Button>&#160;
                        <Modal show={this.state.showModal} onHide={this.closeModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Создание новой корзинки</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGroup controlId="formControlsText">
                                    <ControlLabel>Название корзинки</ControlLabel>
                                    <FormControl type="text" placeholder="Корзинка №1" name="textValue"  onChange={this.changeText}/>
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.createBin}>Сохранить</Button>
                                <Button onClick={this.closeModal}>Отменить</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </Panel>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        user_bins: store.business.user_bins,
        // TODO after removing bin work incorrect - needs to fix
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
    };
};

export default connect(mapStateToProps)(ActiveBinManager);
