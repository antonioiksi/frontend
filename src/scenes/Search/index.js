import React, {Component} from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types'

import {CancelToken} from 'axios';

import SearchResult from "./components/SearchResult";
import SearchFileUpload from "./components/SearchFileUpload";
import {
    Panel, ButtonToolbar, ToggleButton, ToggleButtonGroup, Button, PageHeader, Modal,
    FormGroup, FormControl, Well
} from "react-bootstrap";

import SearchFormList from "./components/SearchFormList";
import {attributes} from "../../services/business";

import {alias_list, search_drill, search_simple} from "../../services/elastic";
import SearchTable from "./components/SearchTable/index";
import {multifield_search_match} from "../../services/business_model_f/index";
import {connect} from "react-redux";
import {strings} from "../../localization";
import SearchResultArray from "./components/SearchResultArray/index";
import SearchFlatFileUpload from "./components/SearchFlatFileUpload/index";
import {prepare_q1, prepare_q2} from "../../services/elastic/queries";
import DownloadLink from "../../../node_modules/react-download-link/download-link";
import {bin_get_active} from "../../services/elastic/index";

const initQueryValues = [
    {
        "speaker":"king",
        "play_name":"Henry",
        "text_entry":"walls table",
    }
]


const SEARCH_TYPES = {FORM:'form', FILE:'file', FLAT_FILE:'flat_file',};

export const search_axios_sources = [];

class Search extends Component {

    constructor(props) {
        super(props);
        this.state={
            bin: '',
            loading:false,
            error:'',
            searchType:SEARCH_TYPES.FORM,
            multiQuery:initQueryValues,
            multiEsQuery:[],
            //multiQueryTemplate:initQueryTemplate,
            esQuery: {},
            result:[],
            multiResult:{},
            aliases: {},
            showModal: false,
            textAreaValue: '',
        };

        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.loadQuery = this.loadQuery.bind(this);


        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.closeShowModal = this.closeShowModal.bind(this);

    }

    componentWillMount() {
        alias_list(this);
        bin_get_active(this);
    }

    loadQuery(query) {
        this.setState({
            multiQuery:query
        });
    }

    loadEsQuery() {
        const multiEsQuery = [];
        this.state.multiQuery.forEach(function(jsonQuery, index) {
            //console.log('forEach' + index + JSON.stringify(jsonQuery));
            let esQ = prepare_q2(jsonQuery)
            multiEsQuery.push(esQ);
        });
        this.setState({
            multiEsQuery: multiEsQuery,
            textAreaValue : JSON.stringify(multiEsQuery, undefined, 4),
        });
    }

    handleShowModal() {
        this.setState({showModal:true});
    }

    closeShowModal() {
        try {
            const temp = JSON.parse(this.state.textAreaValue);
            this.setState({
                multiEsQuery: temp,
                showModal:false
            })

        }
        catch (err) {
            alert('error: ' + err.message);
        }
    }

    handleChangeTextArea(event) {
        event.preventDefault();
        const value = event.target.value;
        //alert(value);
        this.setState({
            textAreaValue: value,
        })

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
        const that = this;

        this.state.multiEsQuery.forEach(function(jsonEsQuery, index) {

            that.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [index] : {
                        //loading:true,
                        result:[],
                        esQuery: jsonEsQuery,
                    }
                }
            }),
                /*
                () => {
                    let cancel = null;
                    let cancelToken = new CancelToken(function executor(c) {
                        cancel = c;
                    });
                    //search_simple(that, esQ, key, cancelToken);
                    //search_axios_sources.push(cancel);
                }*/
            );
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
                        <Well bsSize="small">{strings.ActiveBin} : {this.state.bin.name}</Well>
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
                        <Panel header={strings.Query} bsStyle="success">
                            <Button  bsStyle="primary" bsSize="small" onClick={() => this.loadEsQuery()}>LoadEsQuery</Button>
                            <Button  bsStyle="primary" bsSize="small" onClick={() => this.handleShowModal()}>{strings.ShowQuery}</Button>&#160;
                            <DownloadLink
                                filename="query.json"
                                label={strings.DownloadQuery}
                                exportFile={() => JSON.stringify( this.state.multiEsQuery, undefined, 4)} />
                            <Modal show={this.state.showModal} onHide={this.closeShowModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>{strings.ShowQuery}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <FormGroup>
                                        <FormControl
                                            style={{height: '200px'}}
                                            componentClass="textarea"
                                            value={this.state.textAreaValue}
                                            onChange={this.handleChangeTextArea}
                                        />
                                    </FormGroup>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.closeShowModal}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                            <ReactJson src={this.state.multiEsQuery} />
                        </Panel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Button  bsStyle="primary" bsSize="large" onClick={() => this.handleSearch()}>{strings.CreateSearchQueue}</Button>
                    </div>
                </div>
                <SearchResultArray multiResult={this.state.multiResult} aliases={this.state.aliases} />
            </div>
        )
    }
}

//Search.PropTypes = {
//    axios_sources: PropTypes.array,
//}


const mapStateToProps = function(store) {
    return {
        attrTypes: store.business.attributes,
    };
};


export default connect(mapStateToProps)(Search)