import React, { Component } from 'react';
import { actionVerifyLogin } from '../actions/LoginActions';
import { loaders } from '../components/loaders'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import history from "../history";

// const loginUrl = 'https://discord.com/api/oauth2/authorize?client_id=779767593418227735&redirect_uri=https%3A%2F%2Fdarwin1v1league.com%2Flogin&response_type=code&scope=identify%20guilds&prompt=none'
const devUrl = 'https://discord.com/api/oauth2/authorize?client_id=779767593418227735&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=guilds%20identify&prompt=none'
var code

class LoginPage extends Component {

    componentDidMount() {
        if (localStorage.getItem('userID')) history.push('/profile')
        else {
            this.getCode();
            if (code !== null) this.props.actionVerifyLogin(code)
        }
    }
    getCode() {
        code = new URLSearchParams(this.props.location.search).get('code')
        if (!code) {
            window.location.replace(devUrl)
        }
        return code
    }
    onLogin(LoggedIn){
        return <Redirect to='/profile'/>
    }

    render() {
        const { LoggedIn, LoggingIn } = this.props
        if (LoggingIn) return (
            <div>
                <h1>Beep Boop... Logging In :)</h1>
                {loaders[Math.floor(Math.random() * loaders.length)]}
            </div>
        )
        if (LoggedIn === -1) return (<h2>ehhh... something's not right :/</h2>)
        if (LoggedIn) return (<Redirect to='/profile'/>)
        return(<div></div>)

    }
}
const mapStateToProps = (state) => {
    return { LoggedIn: state.LoggedIn, LoggingIn: state.LoggingIn }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        actionVerifyLogin
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
