import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {
    Button, ButtonToolbar, Modal, OverlayTrigger, Panel, Popover, ToggleButton,
    ToggleButtonGroup, Tooltip
} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";
import SearchTable from "../SearchTable";
import {strings} from "../../../../localization";
import SearchTableExport from "../SearchTableExport";

const VIEW_MODES = {TABLE:'table', TABLE_EXPORT: 'table_export', JSON:'json', };


class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view_mode : VIEW_MODES.TABLE,
            showModal: false,
        }
        this.closeShowModal = this.closeShowModal.bind(this);
    }

    handleShowModal() {
        this.setState({showModal:true});
    }

    closeShowModal() {
        this.setState({showModal:false});
    }


    render() {
        //if(this.props.loading)
        //    return (<ScaleLoader
        //        color={'#36D7B7'}
        //        loading={this.props.loading}
        //    />)
        //alert('render');

        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        {
                            this.props.loading ?
                                (
                                    <ButtonToolbar>
                                        <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.view_mode}>
                                            <ToggleButton value={VIEW_MODES.TABLE} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE})} disabled>{strings.Table}</ToggleButton>
                                            <ToggleButton value={VIEW_MODES.TABLE_EXPORT} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE_EXPORT})} disabled>{strings.PrettyTable}</ToggleButton>
                                            <ToggleButton value={VIEW_MODES.JSON} onClick={()=>this.setState({view_mode:VIEW_MODES.JSON})} disabled>JSON</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                ) : (
                                    <ButtonToolbar>
                                        <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.view_mode}>
                                            <ToggleButton value={VIEW_MODES.TABLE} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE})}>{strings.Table}</ToggleButton>
                                            <ToggleButton value={VIEW_MODES.TABLE_EXPORT} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE_EXPORT})}>{strings.PrettyTable}</ToggleButton>
                                            <ToggleButton value={VIEW_MODES.JSON} onClick={()=>this.setState({view_mode:VIEW_MODES.JSON})}>JSON</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                )
                        }
                    </div>
                    <div className="col-lg-6">
                        <Button  bsStyle="primary" bsSize="small" onClick={() => this.handleShowModal()}>{strings.ShowQuery}</Button>
                        <Modal show={this.state.showModal} onHide={this.closeShowModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{strings.ShowQuery}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ReactJson src={this.props.esQuery}  />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeShowModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={strings.Result} bsStyle="info">
                            {
                                this.props.loading ?
                                    (
                                        <ScaleLoader
                                            color={'#36D7B7'}
                                            loading={this.props.loading}
                                        />
                                    ) : (
                                        this.state.view_mode == VIEW_MODES.TABLE &&
                                        <SearchTable jsonData={this.props.jsonData}/>
                                        || this.state.view_mode == VIEW_MODES.TABLE_EXPORT &&
                                        <SearchTableExport jsonData={this.props.jsonData} aliases={this.props.aliases}/>
                                        || <ReactJson src={this.props.jsonData}  />
                                    )

                            }
                        </Panel>
                    </div>
                </div>
            </div>
        )
    }
}

SearchResult.PropTypes = {
    jsonData: PropTypes.array,
    loading: PropTypes.boolean,
    esQuery: PropTypes.object,
    aliases: PropTypes.object,
};

export default SearchResult;