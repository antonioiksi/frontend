import React from 'react';
import SearchResult from "../SearchResult";
import PropTypes from 'prop-types'
import {strings} from "../../../../localization";
import {Button} from "react-bootstrap";

class SearchResultArray extends React.Component {
    constructor(props) {
        super(props);
        this.children = [];
        this.runAllQueries = this.runAllQueries.bind(this);


    }

    runAllQueries() {
        //alert("runAllQueries");
        this.children.forEach((child, index) => {
                child.runQuery();
            }
        );
    }

    render() {
        const objMultiResult = this.props.multiResult;
        const numberResult = Object.keys(objMultiResult);
        //const axiosSource = null;

        if (Object.keys(objMultiResult).length===0)
            return <div></div>

        return (
            <div>
                <h1>{strings.SearchResultArray}</h1>
                <Button  bsStyle="success" bsSize="small" onClick={() => this.runAllQueries()}>{strings.RunAllQueries}</Button>&#160;
                {
                    Object.keys(objMultiResult).map(index =>
                        <SearchResult  key={index}
                                       index={index}
                                       jsonData={objMultiResult[index].result}
                                       loading={objMultiResult[index].loading}
                                       jsonQuery={objMultiResult[index].jsonQuery}
                                       aliases={this.props.aliases}
                                       onRef={ref => (this.children.push( ref))}
                                       active_bin={this.props.active_bin}
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
    active_bin: PropTypes.object.isRequired,
};

export default SearchResultArray;