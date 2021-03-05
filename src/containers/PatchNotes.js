import React, { Component } from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Header from "../components/Header/Header";
import './HomePage.css'
import season1 from "../data/image/season1_patches.png";
import season2 from "../data/image/season2_patches.png";
import season3 from "../data/image/season3_patches.png";

const discord_link = "https://discord.gg/DBxYx7PwkS"

class PatchNotes extends Component {

    getBg() {
        if (this.props.season === 1) {
            return (season1)
        } else if (this.props.season === 2) {
            return (season2)
        } else if (this.props.season === 3) {
            return (season3)
        }
    }

    render() {

        return (
            <div>
                <Header />
                <MDBView src={this.getBg()}>
                    <div className="main">
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <div className="main-title">
                                <h1 className="intro-text">Patch Notes</h1>
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

export default PatchNotes;
