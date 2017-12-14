import React from 'react';
import {es_querystring} from "../../../../services/elasticsearch";
import ReactJson from 'react-json-view'


class ESInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            es:{},

        }
    }

    componentWillMount() {
        es_querystring('cluster','/_cluster/health',this);
        es_querystring('tasks','/_cat/tasks',this);
        es_querystring('indices','/_cat/indices',this);
        es_querystring('segments','/_cat/segments',this);
        es_querystring('repositories','/_cat/repositories',this);
    }

    render() {
        let es_json = null;
        if(Object.keys(this.state.es).length>0) {
            es_json = this.state.es;
        }

        return (
            <div>
                {
                    es_json!=null? (<ReactJson src={es_json} />) : ('')
                }

            </div>
        )
    }

}

export default ESInfo;