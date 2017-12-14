import React from 'react'
import axios from 'axios';
import {ELASTICSEARCH_URL} from "../constants";


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
