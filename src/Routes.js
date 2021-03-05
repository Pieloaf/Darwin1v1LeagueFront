import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import HomePage from './containers/HomePage';
import NotFoundPage from "./containers/NotFoundPage";
import LeaderboardPage from "./containers/LeaderboardPage";
import LoginPage from "./containers/LoginPage";
<<<<<<< HEAD
import ProfilePage from "./containers/ProfilePage";
=======
import PatchNotes from './containers/PatchNotes';
>>>>>>> 1e8f1e20322c4a4a93e4ad39ae20d1da9303d411

class Routes extends Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
<<<<<<< HEAD
                    <Route path="/profile" component={ProfilePage} />
=======
                    <Route path="/patch_notes/:season" component={(props) => (<PatchNotes season={props.match.params.season} />)} />
>>>>>>> 1e8f1e20322c4a4a93e4ad39ae20d1da9303d411
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