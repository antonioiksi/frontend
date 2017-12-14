import React from 'react';
import {Button, PageHeader, Table} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_list} from "../../services/graph";

class GraphManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            graph_list:[],
        }
    }

    componentWillMount() {
        graph_list(this);
    }



    render() {
        const graph_list = this.state.graph_list;

        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphManager}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        dd
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphManager;