import React, { Component } from 'react';
import bgPic from "../data/image/backgroundImage.png";
import bgVid from "../data/image/Cinecut2.mp4";
import { MDBMask, MDBView } from 'mdbreact';
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
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <div className="main-title">
                                <h1 className="intro-text">Darwin 1v1 League</h1>
                                <h2 className="sub-text">All platforms, All regions</h2>
                                <a className="discord-btn" href={discord_link} target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
                            </div>
                        </MDBMask>
                    </div>
                </MDBView>
            </div>
        );
    }
}

export default HomePage;
