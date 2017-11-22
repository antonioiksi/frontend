import React from 'react';
import SearchResult from "../SearchResult";
import PropTypes from 'prop-types'
import {strings} from "../../../../localization";

class SearchResultArray extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const objMultiResult = this.props.multiResult;
        const numberResult = Object.keys(objMultiResult);

        if (Object.keys(objMultiResult).length===0)
            return <div></div>

        return (
            <div>
                <h1>{strings.SearchResultArray}</h1>
                {
                    Object.keys(objMultiResult).map(key =>
                        <SearchResult  key={key}
                                       jsonData={objMultiResult[key].result}
                                       loading={objMultiResult[key].loading}
                                       esQuery={objMultiResult[key].esQuery}
                                       aliases={this.props.aliases}
                        />
                    )
                }
            </div>
        )
    }
}

SearchResultArray.PropTypes = {
    multiResult: PropTypes.object,
    aliases: PropTypes.object,
};

export default SearchResultArray;