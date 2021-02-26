import React, { Component } from 'react';
import { actionVerifyLogin } from '../actions/LoginActions';
import { loaders } from '../components/loaders'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const loginUrl = 'https://discord.com/api/oauth2/authorize?client_id=779767593418227735&redirect_uri=https%3A%2F%2Fdarwin1v1league.com%3A100%2Flogin&response_type=code&scope=identify%20guilds&prompt=none'
var code

class LoginPage extends Component {

    componentDidMount() {
        this.getCode();
        this.props.actionVerifyLogin(code)
    }
    getCode() {
        code = new URLSearchParams(this.props.location.search).get('code')
        if (!code) {
            window.location.replace(loginUrl)
        }
        return code
    }

    render() {
        const { LoggedIn, LoggingIn } = this.props
        if (LoggingIn) return (
            <div>
                <h1>Beep Boop... Logging In :)</h1>
                {loaders[Math.floor(Math.random() * loaders.length)]}
            </div>
        )
        if (LoggedIn === -1) return (<h2>ehhh... somethings not right :/</h2>)
        if (!LoggedIn === -1) return (<h2>{window.location.replace('https://darwin1v1league.com:100/profile')}</h2>)
        return (<h1>woooah you logged in :D</h1>)

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
