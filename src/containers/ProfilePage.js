import React, { Component } from 'react';
import { MDBView } from 'mdbreact';
import Stats from '../components/Stats';
import Games from '../components/Games';
import season1 from "../data/image/season1.jpg";
import Header from "../components/Header/Header";
import './ProfilePage.css'

class ProfilePage extends Component {

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    render() {
        return (
            <div>
                <Header />
                <MDBView src={season1}>
                    <div className="profile-page-main">
                        <div className="profile-game-container">
                            <Stats user_id={this.props.user_id} />
                            <Games user_id={this.props.user_id} />
                        </div>
                    </div>
                </MDBView>
            </div>
        );
    }

}

export default (ProfilePage);
