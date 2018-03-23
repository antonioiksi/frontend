import React from 'react'
import axios from 'axios';
import {BUSINESS_SERVER_URL, ELASTICSEARCH_URL} from "../constants";
import {verifyToken} from "../session";
import store from "../../store";


export function es_querystring(queryname, querystring, sender) {
    axios.get(ELASTICSEARCH_URL+querystring+'?format=json&pretty')
        .then(({data}) => {
            sender.setState(prevState => ({
                es: {
                    ...prevState.es,
                    [queryname]: data
                }
            }));
        })
        .catch( ( err ) => {
            sender.setState({error: err.message});
        });

}


export function indices( sender)
{
    axios.get(ELASTICSEARCH_URL+'/_cat/indices?format=json&pretty')
        .then(({data}) => {
            sender.setState({es: {indices: data}});
        })
        .catch( ( err ) => {
            sender.setState({error: err.message});
        });
}

//TODO добавить новую функциональнось
export function es_info(sender)
{

    let newState = {};
    axios.get(ELASTICSEARCH_URL+'/_cluster/health?format=json&pretty')
        .then(({data}) => {
            newState  = { cluster: data};
            axios.get(ELASTICSEARCH_URL+'/_cat/count?format=json&pretty')
                .then(({data}) => {
                    newState  = { ...newState, count: data};
                    axios.get(ELASTICSEARCH_URL+'/_cat/indices?format=json&pretty')
                        .then(({data}) => {
                            newState = {...newState, indices: data};
                            axios.get(ELASTICSEARCH_URL+'/_aliases?format=json&pretty')
                                .then(({data}) => {
                                    newState = {...newState, aliases: data};
                                    sender.setState( { es: newState});
                                })
                                .catch( ( err ) => {
                                    sender.setState( { error: '_aliases'});
                                });
                        })
                        .catch( ( err ) => {
                            sender.setState( { error: '_cat/indices'});
                        });



                })
                .catch( ( err ) => {
                    sender.setState( { error: '_cat/count'});
                });
        })
        .catch( ( err ) => {
            sender.setState( { error: '/_cluster/health'});
        });
}