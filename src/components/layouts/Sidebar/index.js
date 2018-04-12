import React from 'react';
import './sidebar.css';
import classNames from 'classnames';

import {OfficeMenu} from '../../menu/OfficeMenu';
import {strings} from "../../../localization";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uiElementsCollapsed: true,
            chartsElementsCollapsed: true,
            multiLevelDropdownCollapsed: true,
            thirdLevelDropdownCollapsed: true,
            samplePagesCollapsed: true,
        };
    }

    render() {
    return(
        <div className="navbar-default sidebar" style={{ marginLeft: '-20px' }} role="navigation">
            <div className="sidebar-nav navbar-collapse collapse">
                <ul className="nav in" id="side-menu">
                    <li className="sidebar-search">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Быстрый поиск..." />
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button">
                                    <i className="fa fa-search" />
                                </button>
                            </span>
                        </div>
                    </li>
                    <li>
                        <a href="/dashboard/">
                            <i className="fa fa-dashboard fa-fw" /> &nbsp;{strings.dashboard}
                        </a>
                    </li>
                    <li>
                        <a href="/search/" >
                            <i className="fa fa-search fa-fw" /> &nbsp;{strings.search}
                        </a>
                    </li>
                    <li>
                        <a href="/active-bin-data/" >
                            <i className="fa fa-table fa-fw" /> &nbsp;{strings.ActiveBinData}
                        </a>
                    </li>
                    <li>
                        <a href="/graph-data/" ><i className="fa fa-table fa-fw" /> &nbsp;{strings.GraphData}</a>
                    </li>
                    <li>
                        <a href="/graph-builder/" >
                            <i className="fa fa-share-alt fa-fw" /> &nbsp;{strings.GraphBuilder}
                        </a>
                    </li>
                    <li>
                        <span>&nbsp;</span>
                    </li>
                    <li>
                        <a href="/bins/" >
                            <i className="fa fa-shopping-basket fa-fw" /> &nbsp;{strings.bins}
                        </a>
                    </li>
                    <li>
                        <a href="/graph-manager/" >
                            <i className="fa fa-book fa-fw" /> &nbsp;{strings.GraphManager}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )}
}

export default Sidebar;