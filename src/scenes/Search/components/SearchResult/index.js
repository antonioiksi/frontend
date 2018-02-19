import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {
    Button, ButtonToolbar, ControlLabel, FormControl, FormGroup, Modal, OverlayTrigger, Panel, Popover, ToggleButton,
    ToggleButtonGroup, Tooltip
} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";
import SearchTable from "../SearchTable";
import {strings} from "../../../../localization";
import SearchTableExport from "../SearchTableExport";
import {search_axios_sources} from "../../index";
import {search_simple} from "../../../../services/elastic/index";


const VIEW_MODES = {TABLE:'table', TABLE_EXPORT: 'table_export', JSON:'json', };


function prettyPrint(ugly) {
    //var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}

class SearchResult extends React.Component {
    axios_source = null;

    constructor(props) {
        super(props);

        //console.log('this.props.key:'+this.props.index);

        this.state = {
            view_mode : VIEW_MODES.TABLE,
            error:'',
            loading:false,
            showQueryModal: false,
            editQueryModal: false,
            textAreaValue: JSON.stringify(props.esQuery, undefined, 4),

            esQuery: props.esQuery,
            result:[],
        }

        this.openShowQueryModal = this.openShowQueryModal.bind(this);
        this.closeShowQueryModal = this.closeShowQueryModal.bind(this);
        this.openEditQueryModal = this.openEditQueryModal.bind(this);
        this.closeEditQueryModal = this.closeEditQueryModal.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this);
        this.runQuery = this.runQuery.bind(this);
        this.cancelQuery = this.cancelQuery.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    method() {
        window.alert('do stuff'+ this.props.index);
    }

    openShowQueryModal() {
        this.setState({showQueryModal:true});
    }

    closeShowQueryModal() {
        this.setState({showQueryModal:false});
    }

    openEditQueryModal() {
        this.setState({editQueryModal:true});
    }

    closeEditQueryModal() {
        try {
            const temp = JSON.parse(this.state.textAreaValue);
            this.setState({
                esQuery: temp,
                editQueryModal:false
            })
        }
        catch (err) {
            alert('error: ' + err.message);
        }
    }

    changeTextArea(event) {
        event.preventDefault();
        const value = event.target.value;
        //alert(value);
        this.setState({
            textAreaValue: value,
        })
    }

    runQuery() {
        const that = this;
        this.setState({
                loading:true,
                result:[],
            },
            () => {
                this.axios_source = search_simple(that, this.state.esQuery);
            }

        );
    }

    cancelQuery() {
        this.axios_source.cancel('Operation canceled by the user.');
    }

    render() {
        //if(this.props.loading)
        //    return (<ScaleLoader
        //        color={'#36D7B7'}
        //        loading={this.props.loading}
        //    />)
        //alert('render');
        const data = this.state.result;
        const data_ = data.data;
        const mapping = data.mapping;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-6">
                        {
                            this.state.loading ?
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
                        <Button  bsStyle="success" bsSize="small" onClick={() => this.runQuery()}>{strings.RunQuery}</Button>&#160;
                        <Button  bsStyle="primary" bsSize="small" onClick={() => this.openShowQueryModal()}>{strings.ShowQuery}</Button>&#160;
                        <Button  bsStyle="warning" bsSize="small" onClick={() => this.openEditQueryModal()}>{strings.EditQuery}</Button>&#160;
                        <Button  bsStyle="danger" bsSize="small" onClick={() => this.cancelQuery()}>{strings.CancelQuery}</Button>
                        <Modal show={this.state.showQueryModal} onHide={this.closeShowQueryModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{strings.ShowQuery}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ReactJson src={this.state.esQuery}  />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeShowQueryModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.editQueryModal} onHide={this.closeEditQueryModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{strings.ShowQuery}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGroup>
                                    <FormControl
                                        style={{height: '300px'}}
                                        componentClass="textarea"
                                        value={this.state.textAreaValue}
                                        onChange={this.changeTextArea}
                                    />
                                </FormGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.closeEditQueryModal}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={strings.Result+' #'+this.props.index} bsStyle="info">
                            {
                                this.state.loading ?
                                    (
                                        <ScaleLoader
                                            color={'#36D7B7'}
                                            loading={this.state.loading}
                                        />
                                    ) : (
                                        this.state.view_mode == VIEW_MODES.TABLE &&
                                        <SearchTable jsonData={this.state.result}/>
                                        || this.state.view_mode == VIEW_MODES.TABLE_EXPORT &&
                                        <SearchTableExport jsonData={this.state.result} aliases={this.props.aliases}/>
                                        || <ReactJson src={this.state.result}  />
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
    forceRun: PropTypes.boolean,
    index: PropTypes.number,
    esQuery: PropTypes.object,
    //jsonData: PropTypes.array,
    //loading: PropTypes.boolean,
    aliases: PropTypes.object,
};

export default SearchResult;