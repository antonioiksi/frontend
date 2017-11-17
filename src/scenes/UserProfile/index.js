import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";

//TODO add some cool charts

class UserProfile extends Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>UserProfile</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        UserProfile CONTENT
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile