import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";
import StatWidget from "../../components/widgets/StatWidget";
import UserBins from "./components/UserBins";
import {strings} from "../../localization";

//TODO add some cool charts

class Bins extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>{strings.bins}</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <UserBins/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bins