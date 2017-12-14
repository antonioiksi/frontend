import React from 'react';
import {Button, PageHeader, Table} from "react-bootstrap";
import {strings} from "../../localization";
import {graph_list} from "../../services/graph";

class Graph extends React.Component {
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
                        <PageHeader>{strings.Graph}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>{strings.Name}</th>
                                <th>{strings.Active}</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                graph_list.map((value, i) =>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.active ? <i class="fa fa-check-square-o" aria-hidden="true"></i> : ''}</td>
                                        <td>
                                            <Button  bsStyle="danger" bsSize="small" onClick={() => this.handleReset(value.id)}>{strings.Reset}</Button>&#160;
                                            <Button  bsStyle="warning" bsSize="small" onClick={() => this.handleLoad(value.id)}>{strings.Load}</Button>&#160;
                                            <Button  bsStyle="success" bsSize="small" onClick={() => this.handleActivate(value.name)}>{strings.Activate}</Button>&#160;
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Graph;