import React, { Component } from 'react';
import { MDBView } from 'mdbreact';
import Stats from '../components/Stats';
import Games from '../components/Games';
import history from "../history";
import season1 from "../data/image/season1.jpg";
import Header from "../components/Header/Header";
import './ProfilePage.css'

class ProfilePage extends Component {

    componentDidMount() {
        if (!this.props.user_id && !localStorage.getItem('userID')) { history.push('/login') }
    }

    user_to_pass() {
        if (this.props.user_id) {
            return this.props.user_id
        }
        else {
            return localStorage.getItem('userID')
        }
    }

    render() {
        return (
            <div>
                <Header />
                <MDBView src={season1}>
                    <div className="profile-page-main">
                        <div className="profile-game-container">
                            <Stats user_id={this.user_to_pass()} />
                            <Games user_id={this.user_to_pass()} />
                        </div>
                    </div>
                </MDBView>
            </div>
        );
    }

}

export default (ProfilePage);
