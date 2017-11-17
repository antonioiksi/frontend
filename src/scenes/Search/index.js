import React, {Component} from 'react'
import ReactJson from 'react-json-view'

import SearchResult from "./components/SearchResult";
import SearchFileUpload from "./components/SearchFileUpload";
import {Panel, ButtonToolbar, ToggleButton, ToggleButtonGroup, Button} from "react-bootstrap";

import SearchFormList from "./components/SearchFormList";
import {attributes} from "../../services/business";

import {search_drill, search_simple} from "../../services/elastic/index";
import SearchTable from "./components/SearchTable/index";
import {multifield_search_match} from "../../services/business_model_f/index";

const initQueryValues = [
    {
        "speaker":"king",
        "play_name":"Henry"
    }
]


const SEARCH_TYPES = {FORM:'form',FILE:'file'};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            error:'',
            attrTypes:[],
            searchType:SEARCH_TYPES.FORM,
            multiQuery:initQueryValues,
            result:[]
        };

        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.loadQuery = this.loadQuery.bind(this);
    }

    componentDidMount() {
        attributes(this);
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
        //event.preventDefault();
        //const that = this;
        let jsonQuery = this.state.multiQuery;
        //this.setState({
        //    result: this.state.query.slice(0),
        //});
        this.setState({loading: true},() => {
            search_drill(this, jsonQuery);
        });
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
        console.log(formsValues);


        return (
            <div>
                <h1>Search</h1>
                {this.state.error!==''?(
                    <Panel header="Ошибка" bsStyle="danger">
                        {this.state.error}
                    </Panel>):('')}

                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.searchType}>
                        <ToggleButton value={SEARCH_TYPES.FORM} onClick={()=>this.setState({searchType:SEARCH_TYPES.FORM})}>Form</ToggleButton>
                        <ToggleButton value={SEARCH_TYPES.FILE} onClick={()=>this.setState({searchType:SEARCH_TYPES.FILE})}>FILE</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
                {
                    this.state.searchType === SEARCH_TYPES.FORM ? (

                        <SearchFormList attrTypes={this.state.attrTypes}
                                        formsValuesProp={formsValues}
                                        loadFormsValues={this.loadFormsValues.bind(this)}
                        />

                    ) : (
                        <SearchFileUpload loadQuery={this.loadQuery}

                        />
                    )
                }

                <Panel header="Запрос" bsStyle="success">
                    <ReactJson src={this.state.multiQuery} />
                </Panel>
                <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleSearch()}>Search</Button>
                <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleSimpleSearch()}>SimpleSearch</Button>
                <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleDrillSearch()}>DrillSearch</Button>
                {
                    /*
                    <SearchResult jsonQuery={this.state.multiQuery} jsonData={this.state.result} loading={this.state.loading}/>
                    */
                }
                <SearchTable jsonQuery={this.state.multiQuery} jsonData={this.state.result} loading={this.state.loading}/>
            </div>
        )
    }
}

export default Search