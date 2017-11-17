import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {Panel, Table} from "react-bootstrap";
import {
    BounceLoader, ClimbingBoxLoader, GridLoader, PacmanLoader, PropagateLoader, RingLoader,
    ScaleLoader
} from "react-spinners";


const Row = (props) => {
    return [
        <tr>
            <td>{props.row._id}</td>
            <td>{props.row._index}</td>
            <td>{props.row._type}</td>
            <td>{JSON.stringify(props.row._source, null, 2)}</td>
        </tr>,
        <tr>
            <td colSpan="4">{JSON.stringify(props.row._source, null, 2)}</td>
        </tr>
    ];
}



class SearchTable extends React.Component {

    render() {
        let data_arr = [];
        if(this.props.jsonData.data)
            data_arr = this.props.jsonData.data;

        return (
            <div>
                <h1>Search Table</h1>
                {
                    this.props.loading ? (
                        <ScaleLoader
                            color={'#36D7B7'}
                            loading={this.props.loading}
                        />

                    ) : (
                        <Panel header="Результат" bsStyle="info">
                            {/*
                            <ReactJson src={this.props.jsonData}  />
                            */}
                            <Table striped bordered condensed hover>
                                <thead>
                                    <th>ID</th>
                                    <th>Index</th>
                                    <th>Type</th>
                                    <th>Source</th>
                                </thead>
                                <tbody>
                                    {
                                        data_arr.map((row, index) =>
                                            <Row row={row} />
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Panel>


                    )

                }
            </div>
        )
    }

}

SearchTable.PropTypes = {
    jsonData: PropTypes.array,
    loading: PropTypes.boolean,
};

export default SearchTable;