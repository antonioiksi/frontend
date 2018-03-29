import React from 'react';
import store from "../../../store";
import * as alertsActions from "../../../services/alerts/actions";
import {AlertList} from "react-bs-notifier";
import {connect} from "react-redux";
import PropTypes from "prop-types";


class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    dismissAlert(obj) {
        store.dispatch(alertsActions.remove(obj));
    }

    render() {
        const alerts = this.props.alerts;

        return (
            <div>
                <AlertList alerts={alerts} onDismiss={this.dismissAlert.bind(this)} timeout={5000} />
            </div>
        )
    }
}

const mapStateToProps = function(store) {
    return {
        alerts: store.alerts.alerts,
    };
};

Alerts.propTypes = {
    alerts: PropTypes.arrayOf(
        PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                message: PropTypes.string.isRequired,
            }
        )
    ).isRequired,
}

export default connect(mapStateToProps)(Alerts);