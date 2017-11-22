import React, {Component} from 'react'
import ReactJson from 'react-json-view'

import SearchResult from "./components/SearchResult";
import SearchFileUpload from "./components/SearchFileUpload";
import {Panel, ButtonToolbar, ToggleButton, ToggleButtonGroup, Button, PageHeader} from "react-bootstrap";

import SearchFormList from "./components/SearchFormList";
import {attributes} from "../../services/business";

import {alias_list, search_drill, search_simple} from "../../services/elastic";
import SearchTable from "./components/SearchTable/index";
import {multifield_search_match} from "../../services/business_model_f/index";
import {connect} from "react-redux";
import {strings} from "../../localization";
import SearchResultArray from "./components/SearchResultArray/index";
import SearchFlatFileUpload from "./components/SearchFlatFileUpload/index";

const initQueryValues = [
    {
        "speaker":"king",
        "play_name":"Henry"
    }
]


const SEARCH_TYPES = {FORM:'form', FILE:'file', FLAT_FILE:'flat_file',};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            error:'',
            searchType:SEARCH_TYPES.FORM,
            multiQuery:initQueryValues,
            esQuery: {},
            result:[],
            multiResult:{},
            aliases: {},
        };

        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.loadQuery = this.loadQuery.bind(this);
    }

    componentWillMount() {
        alias_list(this);
    }

    loadQuery(query) {
        this.setState({
            multiQuery:query
        });
    }

    addValue(name,value) {

        this.setState({
            multiQuery: [...this.state.multiQuery, {name:name, value: value}]
        });
    }


    removeValue(removeId) {
        //console.log(removeId);
        this.setState({
            multiQuery: this.state.multiQuery.filter((_,i) => i !== removeId)
        });
    }

    handleSearch() {
        //event.preventDefault();
        //const that = this;
        let jsonQuery = this.state.multiQuery;
        //this.setState({
        //    result: this.state.query.slice(0),
        //});
        this.setState({loading: true},() => {
            multifield_search_match(this, jsonQuery);
        });
    }

    handleSimpleSearch() {
        //event.preventDefault();
        //const that = this;
        let jsonQuery = this.state.multiQuery;
        //this.setState({
        //    result: this.state.query.slice(0),
        //});
        this.setState({loading: true},() => {
            search_simple(this, jsonQuery);
        });
    }

    handleDrillSearch() {

        const that = this;

        //event.preventDefault();
        //const that = this;
        //let jsonQuery = this.state.multiQuery;
        /*
        let multiQuery = this.state.multiQuery;
        const multiResultNEW = {};
        for(index=0, index < multiQuery.length, ++index) {
            multiResultNEW[index] = {
                loading:true,
                result:[],
                jsonQuery: jsonQuery,
            }
        }
        */


        this.state.multiQuery.forEach(function(jsonQuery, index) {
            console.log('forEach' + index + JSON.stringify(jsonQuery));
            /*
            newElement = {
                loading:true,
                result:[],
                jsonQuery: jsonQuery,
            }
            this.setState({
                multiResult: [...this.state.multiResult, newElement]
            })},
            () => {
                search_drill(this, jsonQuery, index);
            });*/


            let key = index;
            that.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [key] : {
                        loading:true,
                        result:[],
                        jsonQuery: jsonQuery,
                    }
                }
            }),
                    () => {
                search_drill(that, jsonQuery, key);
                    }


                );


            //that.setState({multiResult},
            //    () => {
                    //search_drill(that, jsonQuery, key);
            //    });

        });

        //this.setState({
        //    result: this.state.query.slice(0),
        //});
        //this.setState({loading: true},() => {
        //    search_drill(this, jsonQuery);
        //});
    }

    loadFormsValues(formsValues) {
        let newMultiQuery = [];
        formsValues.forEach(
            function(formValues) {
                let query={};
                formValues.forEach(
                    function (val) {
                        query[val.name] = val.value;
                    }
                );
                newMultiQuery.push(query);
            }
        );
        //console.log(newMultiQuery);

        this.setState({
            multiQuery:newMultiQuery
        });
        //const that = this;
        //let jsonQuery = this.state.multiQuery;
        //this.setState({
        //    result: this.state.query.slice(0),
        //});
        //multifield_search_match(this, jsonQuery);
    }

    render() {
        const formsValues = [];
        this.state.multiQuery.forEach(
            function (query) {
                const values = [];
                Object.keys(query).forEach(
                    function(key) {
                        const value = {"name":key, "value":query[key]};
                        values.push(value);
                    }
                );
                formsValues.push(values);
            }
        );
        //console.log(formsValues);


        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.search}</PageHeader>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        {this.state.error!==''?(<Panel header="Ошибка" bsStyle="danger">
                            {this.state.error}
                        </Panel>):('')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.searchType}>
                                <ToggleButton value={SEARCH_TYPES.FORM} onClick={()=>this.setState({searchType:SEARCH_TYPES.FORM})}>{strings.Form}</ToggleButton>
                                <ToggleButton value={SEARCH_TYPES.FILE} onClick={()=>this.setState({searchType:SEARCH_TYPES.FILE})}>{strings.File}</ToggleButton>
                                <ToggleButton value={SEARCH_TYPES.FLAT_FILE} onClick={()=>this.setState({searchType:SEARCH_TYPES.FLAT_FILE})}>{strings.FlatFile}</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        {
                            this.state.searchType === SEARCH_TYPES.FORM &&
                                <SearchFormList attrTypes={this.props.attrTypes}
                                                formsValuesProp={formsValues}
                                                loadFormsValues={this.loadFormsValues.bind(this)} />
                            || this.state.searchType === SEARCH_TYPES.FILE &&
                                <SearchFileUpload loadQuery={this.loadQuery} />
                            || this.state.searchType === SEARCH_TYPES.FLAT_FILE &&
                                <SearchFlatFileUpload loadQuery={this.loadQuery} />
                        }
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-lg-12">
                        <Panel header={strings.Query} bsStyle="success">
                            <ReactJson src={this.state.multiQuery} />
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleDrillSearch()}>{strings.search}</Button>
                    </div>
                </div>

                <SearchResultArray multiResult={this.state.multiResult} aliases={this.state.aliases} />


            </div>
        )
    }
}


const mapStateToProps = function(store) {
    return {
        attrTypes: store.business.attributes,
    };
};


export default connect(mapStateToProps)(Search)