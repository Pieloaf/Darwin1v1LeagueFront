import React, { Component } from 'react';
import bgPic from "../data/image/backgroundImage.png";
import bgVid from "../data/image/Cinecut2.mp4";
import { MDBMask, MDBView, MDBBtn, MDBDropdownItem, MDBDropdownToggle, MDBDropdownMenu } from 'mdbreact';
import Header from "../components/Header/Header";
import './HomePage.css'
import { FaDiscord } from 'react-icons/fa'
import '../data/Fonts/boxicons-2.0.7/css/boxicons.css'

const discord_link = "https://discord.gg/DBxYx7PwkS"

class HomePage extends Component {

    render() {

        return (
            <div>
                <Header />
                <MDBView >
                    <div className="main">
                        <video className="video-intro" playsInline autoPlay muted loop poster={bgPic}>
                            <source src={bgVid} type="video/mp4" />
                        </video>
                        <img src="https://cdn.discordapp.com/avatars/380444456924741643/9a07bcdd5aed52270a659b39d12c05e3.png?size=2048"></img>
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <div className="main-title">
                                <h1 className="intro-text">Darwin 1v1 League</h1>
                                <h2 className="sub-text">All platforms, All regions</h2>
                                <a className="discord-btn" href={discord_link} target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
                            </div>
                            <div className="socials">
                                <h3>Follow us for updates</h3>
                                <ul className="social-links">
                                    <li><a href="https://www.youtube.com/watch?v=0tCrpVTmb-M" target="_blank" rel="noopener noreferrer"><i className="bx bxl-youtube"></i></a></li>
                                    <li><a href="https://www.twitch.tv/darwin1v1league/" target="_blank" rel="noopener noreferrer"><i className="bx bxl-twitch"></i></a></li>
                                    <li><a href="https://www.instagram.com/darwin1v1league/" target="_blank" rel="noopener noreferrer"><i className="bx bxl-instagram-alt"></i></a></li>
                                    <li><a href="https://twitter.com/1v1Darwin" target="_blank" rel="noopener noreferrer"><i className="bx bxl-twitter"></i></a></li>
                                </ul>
                            </div>
                        </MDBMask>
                    </div>
                </MDBView>
            </div>
        );
    }
}

export default HomePage;
