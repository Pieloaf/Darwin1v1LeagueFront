import React from 'react';
import Header from "../components/Header/Header";
import LeaderBoardTable from "../components/LeaderBoardTable";
import './Leaderboard.css'

class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <div className="leaderboard-page">
                    <div className="module-border-wrap">
                        <span className="leaderboard-title">
                            Leaderboards
                        </span>
                    </div>
                    <div className="leaderboard_container">
                        <LeaderBoardTable platform={this.props.location.platform} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LeaderboardPage;