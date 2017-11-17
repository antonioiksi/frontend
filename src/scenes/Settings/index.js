import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";

//TODO add some cool charts

class Settings extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>Settings</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        Settings CONTENT
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings