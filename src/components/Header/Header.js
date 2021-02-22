import React from 'react';

import history from "../../history";
import './Header.css'
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon
} from "mdbreact";
import { Link } from 'react-router-dom';
import '../../data/Fonts/boxicons-2.0.7/css/boxicons.css'

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
                                                pathname: '/leaderboard/pc'
                                            })}>
                                                <Link to="/leaderboard/pc">PC</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard/ps4'
                                            })}>
                                                <Link to="/leaderboard/ps4">PS4</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard/xbox'
                                            })}>
                                                <Link to="/leaderboard">Xbox</Link></MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/leaderboard'
                                            })}>
                                                <Link to="/leaderboard">Global</Link></MDBDropdownItem>
                                        </MDBDropdownMenu>
                                    </MDBDropdown>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right className="right">
                                <MDBNavItem className="socials">
                                    <a href="https://www.youtube.com/watch?v=0tCrpVTmb-M" target="_blank" rel="noopener noreferrer">
                                        <MDBIcon className="icon" fab icon="youtube" />
                                    </a>
                                </MDBNavItem>
                                <MDBNavItem className="socials">
                                    <a href="https://www.twitch.tv/darwin1v1league/" target="_blank" rel="noopener noreferrer">
                                        <MDBIcon className="icon" fab icon="twitch" />
                                    </a>
                                </MDBNavItem>
                                <MDBNavItem className="socials">
                                    <a href="https://www.instagram.com/darwin1v1league/" target="_blank" rel="noopener noreferrer">
                                        <MDBIcon className="icon" fab icon="instagram" />
                                    </a>
                                </MDBNavItem>
                                <MDBNavItem className="socials">
                                    <a href="https://twitter.com/1v1Darwin" target="_blank" rel="noopener noreferrer">
                                        <MDBIcon className="icon" fab icon="twitter" />
                                    </a>
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