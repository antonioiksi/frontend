import React from 'react';
import {strings} from "../../../../localization/index";
import {PageHeader} from "react-bootstrap";

class NodesLoader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>NodesLoader</PageHeader>
                    </div>
                </div>
            </div>
        )
    }
}

export default NodesLoader;