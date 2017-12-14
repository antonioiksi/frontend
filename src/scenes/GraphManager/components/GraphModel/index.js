import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader} from "react-bootstrap";

class GraphModel extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.GraphModel}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>CONTENT</PageHeader>
                    </div>
                </div>
            </div>
        )
    }
}

export default GraphModel;