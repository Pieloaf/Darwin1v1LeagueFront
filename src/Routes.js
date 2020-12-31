import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import history from './history'
import HomePage from './containers/HomePage'
import NotFoundPage from "./containers/NotFoundPage";
import LeaderboardPage from "./containers/LeaderboardPage";

class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/leaderboard" component={LeaderboardPage} />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/*" component={NotFoundPage} />
                </Switch>
            </Router>
        );
    }
}

export default Routes