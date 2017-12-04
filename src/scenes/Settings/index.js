import React, {Component} from 'react'
import {PageHeader} from "react-bootstrap";
import store from "../../store";
import SettingsItem from "./components/SettingsItem/index";


//TODO add some cool charts

class Settings extends Component {
    render() {
        const settings = store.getState().settings;
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>Settings</PageHeader>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        {
                            Object.keys(settings).map(setting_name =>
                                <div key={setting_name}>
                                    <h3>{settings[setting_name].title} - {settings[setting_name].name}</h3>
                                    <SettingsItem name={setting_name} value={settings[setting_name].setting}/>
                                </div>

                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings