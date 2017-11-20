import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";
import StatWidget from "../../components/widgets/StatWidget";
import {attributes, user_bins} from "../../services/business";

//TODO add some cool charts

class Dashboard extends Component {

    render() {
        // prepera business model
        // load attributes for searching
        attributes();
        user_bins();


        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>Dashboard</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        Dashboard content
                    </div>
                </div>
            </div>
        )
    }

    render1() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>Dashboard</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-primary"
                            icon="fa fa-comments fa-5x"
                            count="26"
                            headerText="New Comments!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-green"
                            icon="fa fa-tasks fa-5x"
                            count="12"
                            headerText="New Tasks!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-yellow"
                            icon="fa fa-shopping-cart fa-5x"
                            count="124"
                            headerText="New Orders!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <StatWidget
                            style="panel-red"
                            icon="fa fa-support fa-5x"
                            count="13"
                            headerText="Support Tickets!"
                            footerText="View Details"
                            linkTo="/"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard