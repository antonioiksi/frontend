import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {ButtonToolbar, Panel, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";
import SearchTable from "../SearchTable";

const VIEW_MODES = {TABLE:'table', JSON:'json'};


class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view_mode : VIEW_MODES.TABLE,
        }
    }


    render() {
        if(this.props.loading)
            return (<ScaleLoader
                color={'#36D7B7'}
                loading={this.props.loading}
            />)

        return (
            <div>
                <h1>Search Result</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.view_mode}>
                                <ToggleButton value={VIEW_MODES.TABLE} onClick={()=>this.setState({view_mode:VIEW_MODES.TABLE})}>Table</ToggleButton>
                                <ToggleButton value={VIEW_MODES.JSON} onClick={()=>this.setState({view_mode:VIEW_MODES.JSON})}>JSON</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header="Результат" bsStyle="info">
                            {
                                this.state.view_mode == VIEW_MODES.TABLE ? (
                                    <SearchTable jsonData={this.props.jsonData}/>
                                ) : (
                                    <ReactJson src={this.props.jsonData}  />
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
};

export default SearchResult;