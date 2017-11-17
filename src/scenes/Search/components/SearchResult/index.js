import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {Panel} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";

class SearchResult extends React.Component {

    render() {
        return (
            <div>
                <h1>Search Result</h1>
                {
                    this.props.loading ? (
                        <ScaleLoader
                            color={'#36D7B7'}
                            loading={this.props.loading}
                        />

                    ) : (
                        <Panel header="Результат" bsStyle="info">
                            <ReactJson src={this.props.jsonData}  />
                        </Panel>
                    )

                }
            </div>
        )
    }

}

SearchResult.PropTypes = {
    jsonData: PropTypes.array,
    loading: PropTypes.boolean,
};

export default SearchResult;