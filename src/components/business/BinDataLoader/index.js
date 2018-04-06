import React from "react";
import {strings} from "../../../localization";
import {connect} from "react-redux";
import _ from "lodash";
import {Button, ButtonToolbar, Panel, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {ScaleLoader} from "react-spinners";
import CsvLoader from "./components/CsvLoader";
import JsonLoader from "./components/JsonLoader";
import JsonTextLoader from "./components/JsonTextLoader";

const VIEW_MODES = {LOAD_CSV:'csv', LOAD_JSON: 'json', LOAD_JSON_TEXT: 'json text',};

class BinDataLoader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            view_mode: VIEW_MODES.LOAD_CSV,
            loading: false,
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
            <Panel>
                <h3>Загрузка данных</h3>
                <div className="row">
                    <div className="col-lg-12">
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.view_mode}>
                                <ToggleButton value={VIEW_MODES.LOAD_CSV} onClick={()=>this.setState({view_mode:VIEW_MODES.LOAD_CSV})}>{VIEW_MODES.LOAD_CSV}</ToggleButton>
                                <ToggleButton value={VIEW_MODES.LOAD_JSON} onClick={()=>this.setState({view_mode:VIEW_MODES.LOAD_JSON})}>{VIEW_MODES.LOAD_JSON}</ToggleButton>
                                <ToggleButton value={VIEW_MODES.LOAD_JSON_TEXT} onClick={()=>this.setState({view_mode:VIEW_MODES.LOAD_JSON_TEXT})}>{VIEW_MODES.LOAD_JSON_TEXT}</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <br/>
                        {
                            this.state.view_mode === VIEW_MODES.LOAD_CSV &&
                                <CsvLoader active_bin={this.props.active_bin}/>
                            || this.state.view_mode === VIEW_MODES.LOAD_JSON &&
                                <JsonLoader active_bin={this.props.active_bin}/>
                            || this.state.view_mode === VIEW_MODES.LOAD_JSON_TEXT &&
                                <JsonTextLoader active_bin={this.props.active_bin}/>
                        }
                    </div>
                </div>
            </Panel>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
    };
};

export default connect(mapStateToProps)(BinDataLoader);
