import React from 'react';
import DownloadLink from "../../../../../node_modules/react-download-link/download-link";
import PropTypes from 'prop-types';
import {dataToFlat} from "./services/utils";
import json2csv from 'json2csv';

class DownloadFlatData extends React.Component {

    render() {

        const data = dataToFlat( this.props.binItemData.data);
        const csv = json2csv(data);
        return(
            <div>
                <DownloadLink
                    filename={"flat-data.json"}
                    label="DownloadFlatData"
                    exportFile={() => JSON.stringify( data.data, undefined, 4)} />
                <DownloadLink
                    filename={"flat-data.csv"}
                    label="DownloadCsvData"
                    exportFile={() => csv} />
            </div>
        )
    }
}

DownloadFlatData.PropTypes = {
    bin_item_data: PropTypes.object,
}


export default DownloadFlatData;