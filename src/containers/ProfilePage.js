import React, { Component } from 'react';
import { MDBView } from 'mdbreact';
import Stats from '../components/Stats';
import Games from '../components/Games';
import ProfileCard from '../components/ProfileCard';
import season1 from "../data/image/season1.jpg";
import Header from "../components/Header/Header";
import './ProfilePage.css'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionGetProfile } from '../actions/ProfileActions'
import { loaders } from '../components/loaders';

class ProfilePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            season: ''
        }
    }
    componentDidMount() {
        this.props.actionGetProfile(this.props.user_id, this.state.season)
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.state.season, prevProps.season)
    //     if (this.state.season !== prevProps.season) {
    //         this.props.actionGetProfile(this.props.user_id, this.state.season)
    //     }
    // }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.season !== prevState.season) {
            this.props.actionGetProfile(this.props.user_id, this.state.season)
        }
    }
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    userNotFound() {
        if (this.getCookie('1v1league-sid') && !this.props.user_id) {
            return (<div className="join-up">
                <span style={{ fontFamily: 'Rift', fontSize: '32px' }}>Looks like you're not yet in the league.</span>
                <a href="https://discord.gg/DBxYx7PwkS" target="_blank" rel="noopener noreferrer">Click here to join</a>
            </div>)
        }
        return <span style={{ fontFamily: 'Rift', fontSize: '32px' }}>User Not Found</span>
    }

    changeSeason(e) {
        this.setState({ season: e.target.value })
    }

    render() {
        const { ProfileLoaded, LoadingProfile } = this.props

        return (
            <div>
                <Header />
                <MDBView src={season1}>
                    <div className="profile-page-main">
                        <div className="profile-game-container">
                            <div className="profile">
                                <div className="profile-card">
                                    {
                                        LoadingProfile || !ProfileLoaded || ProfileLoaded.length < 1 ? <div></div> : <ProfileCard user={ProfileLoaded[0]} />
                                    }
                                </div>
                                <div className="ukelele">
                                    <div className='stats-title'>
                                        <span>Stats</span>
                                        <select onChange={this.changeSeason.bind(this)}>
                                            <option value="">Season 5</option>
                                            <option value="4">Season 4</option>
                                            <option value="3">Season 3</option>
                                            <option value="2">Season 2</option>
                                            <option value="1">Season 1</option>
                                        </select>
                                    </div>
                                    <div className='stats'>{
                                        !LoadingProfile ?
                                            (!ProfileLoaded || ProfileLoaded.length < 1 ? <div>No season activity</div>
                                                : <Stats user={ProfileLoaded[0]} />
                                            ) : loaders[Math.floor(Math.random() * loaders.length)]
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="games-container">
                                <span className="games-title">Match History</span>
                                <div className="col-titles">
                                    <span className="id-col">game</span>
                                    <span className="elo-change-col">Elo</span>
                                    <span className="opponent-col">Opponent</span>
                                    <span className="date-col">Date</span>
                                </div>
                                <div className="games">
                                    {
                                        !LoadingProfile ?
                                            (!ProfileLoaded || ProfileLoaded.length < 1 ? <div>No games found</div>
                                                : <Games games={ProfileLoaded[1]} user_id={ProfileLoaded[0].user_id} season={this.state.season} />
                                            ) : loaders[Math.floor(Math.random() * loaders.length)]
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </MDBView>
            </div>
        )
        // }; return (<div></div>)
    }

}

const mapStateToProps = (state) => {
    return { ProfileLoaded: state.ProfileLoaded, LoadingProfile: state.LoadingProfile }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        actionGetProfile
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

// export default (ProfilePage);
