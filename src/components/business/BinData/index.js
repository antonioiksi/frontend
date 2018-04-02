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
import {strings} from "../../../localization";
import _ from "lodash";
import {bin_items, bin_items_data} from "../../../services/business";
import {connect} from "react-redux";


const VIEW_MODES = {TABLE:'table', TABLE_EXPORT: 'table_export', JSON:'json', };


function prettyPrint(ugly) {
    //var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}

class BinData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view_mode : VIEW_MODES.TABLE,
            loading:false,
            bin_items_data: [],
        }
    }

    componentWillMount() {
        const sender = this;
        if(this.props.active_bin) {
            this.setState({
                loading: true,
            }, () => {
                bin_items_data(this.props.active_bin.id, sender);
            })

        }
    }

    componentWillReceiveProps(nextProps) {
        const sender = this;
        if (this.props.active_bin.id !== nextProps.active_bin.id) {
            this.setState({
                loading: true,
            }, () => {
                bin_items_data(this.props.active_bin.id, sender);
            })
        }
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
                <div className="row">
                    <div className="col-lg-6">
                        {
                            <ButtonToolbar>
                                <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.view_mode}>
                                    <ToggleButton value={VIEW_MODES.TABLE} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE})}>{strings.Table}</ToggleButton>
                                    <ToggleButton value={VIEW_MODES.TABLE_EXPORT} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE_EXPORT})}>{strings.PrettyTable}</ToggleButton>
                                    <ToggleButton value={VIEW_MODES.JSON} onClick={()=>this.setState({view_mode:VIEW_MODES.JSON})}>JSON</ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {
                            /*
                            this.state.view_mode == VIEW_MODES.TABLE &&
                            <SearchTable jsonData={this.state.result}/>
                            || this.state.view_mode == VIEW_MODES.TABLE_EXPORT &&
                            <SearchTableExport jsonData={this.state.result} aliases={this.props.aliases}/>
                            || <ReactJson src={this.state.result}  />
                            */
                            JSON.stringify(this.state.bin_items_data, null, 4)

                        }
                    </div>
                </div>
            </div>
        )
    }
}

BinData.PropTypes = {
};

const mapStateToProps = function(store) {
    return {
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
    };
};


export default connect(mapStateToProps)(BinData);
