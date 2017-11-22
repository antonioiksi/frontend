import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {Panel, Table} from "react-bootstrap";
import './SearchTableExport.css';
import {strings} from "../../../../localization/index";


const Table_source = (props) => {

    return [
        <Table striped bordered condensed hover className="export">
            <thead>
            <tr>
                <th>{strings.Name}</th>
                <th>{strings.Value}</th>
            </tr>
            </thead>
            <tbody>
            <tr><td>_id</td><td>{props.row._id}</td></tr>
            <tr><td>_index</td><td>{props.row._index}</td></tr>
            <tr><td>_type</td><td>{props.row._type}</td></tr>

            {
                Object.keys(props.aliases[props.row._index].aliases).map(function(key) {
                    return (
                        <tr><td>alias</td><td key={key}>{key}</td></tr>
                    )
                })
            }
            {
                Object.keys(props.row._source).map(function(key) {
                    return(
                        <tr><td>{key}</td><td>{props.row._source[key]}</td></tr>
                    )
                })
                //Object.keys(this.state.items).map(function (key) {
                //    var item = this.state.items[key]
                //}
            }
            </tbody>
        </Table>,
        <br/>
    ];
}



class SearchTableExport extends React.Component {

    render() {
        let data_arr = [];
        if(this.props.jsonData.data)
            data_arr = this.props.jsonData.data;

        return (
            <div>

                    {
                        data_arr.map((row, index) =>
                            <Table_source row={row} key={index} aliases={this.props.aliases} />
                        )
                    }
            </div>
        )
    }

}

SearchTableExport.PropTypes = {
    jsonData: PropTypes.array,
    loading: PropTypes.boolean,
    aliases: PropTypes.object,
};

export default SearchTableExport;