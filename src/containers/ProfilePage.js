import React, { Component } from 'react';
import { actionGetProfile } from '../actions/ProfileActions';
import { loaders } from '../components/loaders'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../history";

class LoginPage extends Component {

    componentDidMount() {
        if (localStorage.getItem('userID')) this.props.actionGetProfile(localStorage.getItem('userID'))
        else history.push('/login')
    }
    logout(){
            localStorage.removeItem('userID')
            history.push('/home')
    }


    render() {
        const { ProfileLoaded, LoadingProfile } = this.props
        if (LoadingProfile) return (
            <div>
                <h1>Beep Boop... Loading Profile :)</h1>
                {loaders[Math.floor(Math.random() * loaders.length)]}
            </div>
        )
        if (ProfileLoaded === -1) return (<h2>ehhh... something's not right :/</h2>)
        if (ProfileLoaded) return (<div><p>Name: {ProfileLoaded.user_name}<br></br>Elo: {ProfileLoaded.elo}<br></br>Rank: {ProfileLoaded.q_rank}</p><button onClick={this.logout}>Logout</button></div>)
        return(<div>{ProfileLoaded}</div>)

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
