import React, { Component } from 'react';
import { actionVerifyLogin } from '../actions/LoginActions';
import { loaders } from '../components/loaders'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import history from "../history";

const loginUrl = 'https://discord.com/api/oauth2/authorize?client_id=779767593418227735&redirect_uri=https%3A%2F%2F1v1league.pieloaf.com%2Flogin&response_type=code&scope=identify%20guilds&prompt=none'
const devUrl = 'https://discord.com/api/oauth2/authorize?client_id=779767593418227735&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=guilds%20identify&prompt=none'
var code

class LoginPage extends Component {

    componentDidMount() {
        if (this.getCookie('1v1league-sid')) history.push('/profile')
        else {
            this.getCode();
            if (code !== null) this.props.actionVerifyLogin(code)
        }
    }
    getCode() {
        code = new URLSearchParams(this.props.location.search).get('code')
        if (!code) {
            window.location.replace(loginUrl)
        }
        return code
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
        if (LoggedIn) return (<Redirect to='/profile' />)
        return (<div></div>)

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
