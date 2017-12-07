import React from 'react'
import PropTypes from 'prop-types'
import {Panel, Table} from "react-bootstrap";


const Row = (props) => {
    return [
        <tr>
            <td>{props.row._id}</td>
            <td>{props.row._id}</td>
        </tr>,
        <tr>
            <td colSpan="3">{JSON.stringify(props.row._source, null, 2)}</td>
        </tr>
    ];
}



class DataTable extends React.Component {

    render() {
        let data_arr = [];
        if(this.props.jsonData.data)
            data_arr = this.props.jsonData.data;

        return (
            <div>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Index</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data_arr.map((row, index) =>
                            <Row key={index} row={row} />
                        )
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}

SearchTable.PropTypes = {
    jsonData: PropTypes.array,
    loading: PropTypes.boolean,
};

export default DataTable;