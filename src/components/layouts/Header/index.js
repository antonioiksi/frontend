import React from 'react';
import './header.css';

import {TopMenu} from '../../menu/TopMenu';
import {MenuItem, Navbar, NavDropdown, ProgressBar} from "react-bootstrap";
import {Brand} from 'react-bootstrap/lib/Navbar';
import $ from "jquery";
import Sidebar from "../Sidebar";
import {strings} from "../../../localization";

const logo = require('./logo.png');

export const Header = () => {
    return(
        <div id="wrapper" className="content">
            <Navbar fluid={true}  style={ {margin: 0} }>
                <Brand>
            <span>
              <img src={logo} alt="Start React" title="Start React" />
              <span>&nbsp;Frontend</span>
                <button type="button" className="navbar-toggle" onClick={() => {toggleMenu();}} style={{position: 'absolute', right: 0, top: 0}}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
            </span>
                </Brand>
                <ul className="nav navbar-top-links navbar-right">

                    <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id = 'navDropdown4'>
                        <MenuItem eventKey="1" href = '/userprofile/'>
                            <span> <i className="fa fa-user fa-fw"></i> {strings.UserProfile} </span>
                        </MenuItem>
                        <MenuItem eventKey="2" href = '/settings/'>
                            <span><i className="fa fa-gear fa-fw" ></i> {strings.Settings} </span>
                        </MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey = "4" href = '/logout/'>
                            <span> <i className = "fa fa-sign-out fa-fw" /> {strings.Logout} </span>
                        </MenuItem>
                    </NavDropdown>

                </ul>
                <Sidebar/>
            </Navbar>
        </div>
    )
}

function toggleMenu(){
    if($(".navbar-collapse").hasClass('collapse')){
        $(".navbar-collapse").removeClass('collapse');
    }
    else{
        $(".navbar-collapse").addClass('collapse');
    }
}
