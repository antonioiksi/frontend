import React, {Component} from 'react'
import ReactJson from 'react-json-view'
import PropTypes from 'prop-types'

import _ from 'lodash';

import {CancelToken} from 'axios';

import SearchResult from "./components/SearchResult";
import SearchFileUpload from "./components/SearchFileUpload";
import {
    Panel, ButtonToolbar, ToggleButton, ToggleButtonGroup, Button, PageHeader, Modal,
    FormGroup, FormControl, Well
} from "react-bootstrap";

import SearchFormList from "./components/SearchFormList";
import {attributes, bin_get_active, bin_reset, get_active_bin_with_items} from "../../services/business";

import {alias_list, search_drill, search_simple} from "../../services/elastic";
import SearchTable from "./components/SearchTable/index";
import {multifield_search_match} from "../../services/business_model_f/index";
import {connect} from "react-redux";
import {strings} from "../../localization";
import SearchResultArray from "./components/SearchResultArray/index";
import SearchFlatFileUpload from "./components/SearchFlatFileUpload/index";
import {prepare_q1, prepare_q2} from "../../services/elastic/queries";
import DownloadLink from "../../../node_modules/react-download-link/download-link";
import ActiveBinManager from "../../components/business/ActiveBinManager/index";
import {Alert, AlertContainer, AlertList} from "react-bs-notifier";

import './style.css';

const initQueryValues = [
/*
    {
        "speaker":"king",
        "play_name":"Henry",
        "text_entry":"walls table",
    }
    */
]


const SEARCH_TYPES = {FORM:'form', FILE:'file', FLAT_FILE:'flat_file',};

export const search_axios_sources = [];

class Search extends Component {

    constructor(props) {
        super(props);
        this.state={
            bin: '',
            bin_list:[],
            loading:false,
            error:'',
            searchType:SEARCH_TYPES.FORM,
            multiQuery:initQueryValues,

            multiJsonQuery:[],
            multiEsQuery:[],
            //multiQueryTemplate:initQueryTemplate,
            esQuery: {},
            result:[],
            multiResult:{},
            aliases: {},
            showModal: false,
            textAreaValue: '',
            // TODO alerts !!!
            alerts : [{
                id: new Date().getTime(),
                type: "info",
                message: "Hello, world"
            }, {
                id: new Date().getTime(),
                type: "success",
                message: "Oh, hai"
            }],

        };

        this.addValue = this.addValue.bind(this);
        this.removeValue = this.removeValue.bind(this);
        this.loadQuery = this.loadQuery.bind(this);


        this.handleChangeTextArea = this.handleChangeTextArea.bind(this);
        this.closeShowModal = this.closeShowModal.bind(this);

    }

    componentWillMount() {
        alias_list(this);
        //bin_get_active(this);
        get_active_bin_with_items(this);
    }

    handleReset(bin_pk) {
        let answer = window.confirm('Вы уверены что хотите очистить корзинку с ID '+bin_pk +' ?');
        if(answer) {
            bin_reset(bin_pk);
        }
    }

    selectBin(event) {
        let bin_id = event.target.value;
        alert(bin_id);
    }

    loadQuery(query) {
        this.setState({
            multiQuery:query
        });
    }

    loadEsQuery() {
        const multiJsonQuery = [];
        const multiEsQuery = [];
        const entityAttributeMapping =  this.props.entityAttributes;
        this.state.multiQuery.forEach(function(jsonQuery, index) {
            //console.log('forEach' + index + JSON.stringify(jsonQuery));
            let esQ = prepare_q2(jsonQuery, entityAttributeMapping);
            multiJsonQuery.push(jsonQuery);
            multiEsQuery.push(esQ);
        });
        this.setState({
            multiJsonQuery: multiJsonQuery,
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
        //const  multiJsonQuery = this.state.multiJsonQuery;
        this.state.multiQuery.forEach(function(jsonQuery, index) {

            that.setState( prevState => ({
                multiResult: {
                    ...prevState.multiResult,
                    [index] : {
                        //loading:true,
                        result:[],
                        //esQuery: jsonEsQuery,
                        jsonQuery: jsonQuery,
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

    dismissAlert(obj) {
        alert(JSON.stringify(obj, 2, null));
        const deleteId  = obj.id;
        this.setState(
            {
                alerts: _.filter(this.state.alerts, (current) => {
                    return current.id !== deleteId;
                })
            }
        );
    }

    render() {
        let bin_list = [];
        let current_bin_id = this.state.bin.id;
        this.state.bin_list.forEach((bin, index) => {
            bin_list.push({
                id: bin.id,
                name: bin.name,
            });
        });


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
                    <div className="col-lg-7">
                        <ActiveBinManager/>
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
                                <SearchFormList attrTypes={this.props.entityAttributes}
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
                        <Button  bsStyle="info" bsSize="large" className="wideButton" onClick={() => this.handleSearch()}>Поиск</Button>
                    </div>
                </div>
                <SearchResultArray multiResult={this.state.multiResult} aliases={this.state.aliases} active_bin={this.props.active_bin}/>
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
        entityAttributes: store.business.entity_attributes,
        active_bin: _.findLast(store.business.user_bins, {'active': true}),
    };
};


export default connect(mapStateToProps)(Search)