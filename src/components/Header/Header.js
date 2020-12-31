import React from 'react';

import history from "../../history";
import './Header.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

class Header extends React.Component {

    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div>
                <header>
                    <MDBNavbar color="rgba-black-light" dark expand="md" fixed="top">
                        <MDBNavbarBrand>
                            <strong className="white-text" style={{ borderRight: "rgba(93, 228, 255, 0.75) 1px solid", paddingRight: "20px" }}>Darwin 1v1 League</strong>
                        </MDBNavbarBrand>
                        <MDBNavbarToggler onClick={this.toggleCollapse} />
                        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem className="leaderboard-tab">
                                    <MDBNavLink to="/Home">Home</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem to="leaderboard" className="leaderboard-tab">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Leaderboards</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard',
                                                platform: 'PC',
                                            })}>
                                                <Link to="/leaderboard">PC</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard',
                                                platform: 'PS4',
                                            })}>
                                                <Link to="/leaderboard">PS4</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard',
                                                platform: 'XBOX',
                                            })}>
                                                <Link to="/leaderboard">Xbox</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard',
                                                platform: '',
                                            })}>
                                                <Link to="/leaderboard">Global</Link></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </MDBNavbar>
                </header>
            </div >
        );
    }
}

export default Header;