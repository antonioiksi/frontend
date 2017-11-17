import React from 'react'
import axios from 'axios';
import {ELASTICSEARCH_URL} from "../constants";



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
