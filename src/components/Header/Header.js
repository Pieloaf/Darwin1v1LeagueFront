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
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    userStatus() {
        if (this.getCookie('1v1league-sid')) {
            return (
                <MDBDropdownMenu>
                    <MDBDropdownItem onClick={() => history.push({
                        pathname: '/profile'
                    })}>
                        <Link to='/profile'>My Profile</Link></MDBDropdownItem>
                    <MDBDropdownItem onClick={() => {
                        document.cookie = '1v1league-sid=; Max-Age=-99999999;';
                        window.location.href = "https://darwin1v1league.com"
                    }}>
                        <Link to="/home">Logout</Link></MDBDropdownItem>
                </MDBDropdownMenu>
            )
        }
        return (
            <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => history.push({
                    pathname: '/login'
                })}>
                    <Link to='/login'>Login</Link></MDBDropdownItem>
            </MDBDropdownMenu>)
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
                                <MDBNavItem className="leaderboard-tab">
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
                                <MDBNavItem className="profile-tab">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Profile</span>
                                        </MDBDropdownToggle>
                                        {this.userStatus()}
                                    </MDBDropdown>
                                </MDBNavItem>
                                <MDBNavItem className="patch-notes-tab">
                                    <MDBDropdown>
                                        <MDBDropdownToggle nav caret>
                                            <span className="mr-2">Patch Notes</span>
                                        </MDBDropdownToggle>
                                        <MDBDropdownMenu>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/patch-notes/season-1'
                                            })}>
                                                <Link to='/patch-notes/season-1'>Season 1</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/patch-notes/season-2'
                                            })}>
                                                <Link to="/patch-notes/season-2">Season 2</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/patch-notes/season-3'
                                            })}>
                                                <Link to="/patch-notes/season-3">Season 3</Link>
                                            </MDBDropdownItem>
                                            <MDBDropdownItem onClick={() => history.push({
                                                pathname: '/patch-notes/season-5'
                                            })}>
                                                <Link to="/patch-notes/season-5">Season 5</Link>
                                            </MDBDropdownItem>
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