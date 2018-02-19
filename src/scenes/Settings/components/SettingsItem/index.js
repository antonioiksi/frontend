import React, {Component} from 'react'
import ReactJson from 'react-json-view'
import {Button, FormControl, FormGroup, Modal} from "react-bootstrap";
import {strings} from "../../../../localization";
import {reset_setting, update_setting} from "../../../../services/settings";


export const ITEM_STATUS = {UPDATED:'UPDATED', LOADING:'LOADING',};

class SettingsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //changed: false,
            status: ITEM_STATUS.UPDATED,
            value: JSON.stringify(this.props.value, undefined, 4),
            editModal: false,
        }
        this.openEditModal = this.openEditModal.bind(this);
        this.closeEditModal = this.closeEditModal.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this);
    }

    openEditModal() {
        this.setState({editModal:true});
    }

    changeTextArea(event) {
        event.preventDefault();
        const value = event.target.value;
        //alert(value);
        this.setState({
            value: value,
        })

    }

    closeEditModal() {
        //alert('edit');
        //this.setState({editModal:false});
        const val_json = JSON.parse(this.state.value);
        this.setState( {status: ITEM_STATUS.LOADING, editModal:false},
            () => {
                update_setting(this.props.name, val_json, this)
            }
        );

    }


    handleReset() {
        this.setState({status:ITEM_STATUS.LOADING},
            () => {
                reset_setting(this.props.name, this)
            }
        );
    }


    render() {
        return (
            <div>
                <ReactJson src={JSON.parse(this.state.value)} />
                <Button onClick={() => this.openEditModal()} >Edit</Button>
                <Button onClick={this.handleReset.bind(this)}>Reset</Button>
                <Modal show={this.state.editModal} onHide={this.closeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{strings.ShowQuery}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <FormControl
                                style={{height: '300px'}}
                                componentClass="textarea"
                                value={this.state.value}
                                onChange={this.changeTextArea}
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeEditModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        )
    }
}

export default SettingsItem;