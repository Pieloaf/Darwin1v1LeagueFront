import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HomePage from './containers/HomePage';
import NotFoundPage from "./containers/NotFoundPage";
import LeaderboardPage from "./containers/LeaderboardPage";
import LoginPage from "./containers/LoginPage";
import ProfilePage from "./containers/ProfilePage";

class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route path="/leaderboard/:platform/:region" component={(props) => (<LeaderboardPage platform={props.match.params.platform} region={props.match.params.region} />)} />
                    <Route path="/leaderboard/:platform" component={(props) => (<LeaderboardPage platform={props.match.params.platform} />)} />
                    <Route path="/leaderboard/" component={LeaderboardPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default Routes