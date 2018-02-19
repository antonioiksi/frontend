import React from 'react'
import PropTypes from 'prop-types'
import ReactJson from 'react-json-view'
import {Panel, Table} from "react-bootstrap";
import './SearchTableExport.css';
import {strings} from "../../../../localization/index";
import jspath from 'jspath';
import _ from 'lodash';
import DownloadLink from "../../../../../node_modules/react-download-link/download-link";


const Table_source = (props) => {

    const mapped_search = [];
    Object.keys(props.row._source).map(function(key) {
        let mapped_field =  _.keys(_.get(props.mapping,props.row._index+'.'+props.row._type+'.'+key+'.fields'));
        let value = props.row._source[key];
        //if(mapped_field.length>0 && value.length>0)
        if(mapped_field.length>0 && value.toString().length>0)
            mapped_search.push({[mapped_field]:props.row._source[key]});
    });


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
                    let mapped_field =  _.keys(_.get(props.mapping,props.row._index+'.'+props.row._type+'.'+key+'.fields'));
                    return(
                        <tr>
                            <td>
                                {key}<br/>
                                {mapped_field.length>0 && '('+mapped_field+')'}
                            </td>
                            <td>
                                {props.row._source[key]}
                            </td>
                        </tr>
                    )
                })
                //Object.keys(this.state.items).map(function (key) {
                //    var item = this.state.items[key]
                //}
            }
            <tr>
                <td colSpan="2">
                    <DownloadLink
                        filename="mapped-query.json"
                        label={strings.DownloadMappedQuery}
                        exportFile={() => JSON.stringify( mapped_search, undefined, 4)} />
                    <ReactJson src={mapped_search}  />
                </td>
            </tr>
            </tbody>
        </Table>,
        <br/>
    ];
}



class SearchTableExport extends React.Component {

    render() {
        let data_arr = [];
        let data_map = [];
        if(this.props.jsonData.data)
            data_arr = this.props.jsonData.data;
        if(this.props.jsonData.mapping)
            data_map = this.props.jsonData.mapping;
        return (
            <div>

                    {
                        data_arr.map((row, index) =>
                            <Table_source row={row} key={index} aliases={this.props.aliases} mapping={data_map}/>
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