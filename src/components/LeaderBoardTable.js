import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionGetLeaderboard } from '../actions/LeaderboardActions'
import { loaders } from './loaders'
import SimpleTable from "./SimpleTable";
import { MDBCol, MDBRow } from "mdbreact";
import './Table.css'
import gold from '../data/image/medals/1.png'
import silver from '../data/image/medals/2.png'
import bronze from '../data/image/medals/3.png'
import steamLogo from '../data/image/logos/PC.png'
import XboxLogo from '../data/image/logos/Xbox.png'
import PS4Logo from '../data/image/logos/PS4.png'

class LeaderBoardTable extends React.Component {


    componentDidMount() {
        this.props.actionGetLeaderboard(this.props.platform)
    }

    display_medal(player) {
        if (player.ranking > 3)
            return player.ranking
        const src = player.ranking === 3 ? gold : player.ranking === 2 ? silver : bronze
        return <span className="container_medal">
            <img className="player_medal" width="50px" height="50px" src={src} alt="medal" />
            <div className="centered">{player.ranking}</div>
        </span>
    }

    display_avatar(player) {
        return <span className="profile_col">
            <img className="player_avatar" src={player.avatar_url} alt="avatar" />
            {player.user_name}
        </span>
    }
    get_winrate(player) {
        const winrate = Math.round((player.victory / (player.victory + player.defeat)) * 100, 2)
        console.log(winrate)
        let color = ''
        if (winrate > 50)
            color = "#45ff51"
        if (winrate < 50)
            color = "#ff8345"
        return <div style={{ color: color }}>{winrate} %</div>
    }

    get_streak(player) {
        if (!player.streak)
            return ''
        return player.streak
    }

    get_matchplayed(player) {
        const match_played = player.victory + player.defeat
        if (!match_played)
            return ''
        return match_played
    }

    get_platform(row) {
        let src = ''
        switch (row.platform) {
            case 'PC':
                src = steamLogo
                break;
            case 'Xbox':
                src = XboxLogo
                break;
            case 'PS4':
                src = PS4Logo
                break;
            default:
                break;
        }
        if (!src)
            return ''
        return <img width="50px" height="50px" src={src} alt={row.platform} />
    }

    get_rank_and_color_from_elo(elo) {
        const rolesValues = [
            ["Legend", 1500, "rgba(219, 0, 102, 1)"],
            ["Master", 1300, "rgba(190, 0, 255, 0.65)"],
            ["Diamond", 1150, "rgba(0, 227, 255, 0.75)"],
            ["Gold", 1000, "rgba(242, 167, 37, 1)"],
            ["Silver", 950, "rgba(189, 189, 189, 0.7)"],
            ["Bronze", 850, "rgba(178, 99, 38, 1)"],
            ["Steel", 700, "rgba(178, 99, 38, 1)"],
            ["Iron", 500, "rgba(178, 99, 38, 1)"],
            ["Inmate", 0, "rgba(46, 204, 113, 0.9)"]
        ]
        for (let i = 0; i < rolesValues.length; i++)
            if (elo >= rolesValues[i][1])
                return rolesValues[i]
    }

    render_elo(row) {
        const rank = this.get_rank_and_color_from_elo(row.elo)
        return <div className="elo-col">
            {row.elo}
            <div className={"rank-badge " + rank[0]} style={{ backgroundColor: rank[2] }}>
                {rank[0]}
            </div>
        </div>
    }
    buttons() {
        let buttonStyles = { backgroundColor: '#cc6633', borderRadius: '50px', margin: '5px', color: '#fff', borderWidth: '0px' }
        return (
            <div>
                <button onClick={() => this.filterTable("PC")} style={buttonStyles}> PC </button>
                <button onClick={() => this.filterTable("PS4")} style={buttonStyles}> PS4 </button>
                <button onClick={() => this.filterTable("XBOX")} style={buttonStyles}> XBOX</button>
                <button onClick={() => this.filterTable("")} style={buttonStyles}> ALL </button>
            </div>
        )
    }

    filterTable = (platform) => {
        this.props.actionGetLeaderboard(platform)
    }
    render() {
        const { Leaderboard, LeaderboardIsLoading } = this.props

        if (LeaderboardIsLoading) return loaders[Math.floor(Math.random() * loaders.length)]
        if (Leaderboard === -1)
            return <div>{this.buttons()}Seems like server is dead lul</div>
        if (!Leaderboard || !Leaderboard.length)
            return <div>{this.buttons()}Looks like the database has just been cleared</div>
        const FilteredLeaderboard = Leaderboard.filter(player => (player.victory + player.defeat) > 0)
        if (!FilteredLeaderboard || !FilteredLeaderboard.length)
            return <div>{this.buttons()}Looks like the leaderboards have just been reset</div>
        return (
            <div>
                {this.buttons()}
                <MDBRow style={{ width: '100%' }}>
                    <MDBCol>
                        <SimpleTable
                            name="leaderboard_table"
                            filterable
                            data={FilteredLeaderboard}
                            columns=
                            {[
                                { Header: "id", accessor: "id", show: false },
                                {
                                    Header: "#", width: 100, id: "ranking", accessor: (row) => {
                                        return this.display_medal(row)
                                    }, className: "center"
                                },
                                {
                                    Header: "Name", id: "name", minWidth: 250, accessor: (row) => {
                                        return this.display_avatar(row)
                                    }, className: "center"
                                },
                                { Header: "Elo", width: 150, id: "elo", accessor: (row) => { return this.render_elo(row) }, className: "center" },
                                {
                                    Header: "Victory",
                                    width: 150,
                                    id: "victory",
                                    accessor: "victory",
                                    className: "center"
                                },
                                { Header: "Defeat", width: 150, id: "defeat", accessor: "defeat", className: "center" },
                                {
                                    Header: "Winrate", width: 125, id: "winrate", accessor: (row) => {
                                        return this.get_winrate(row)
                                    }, className: "center"
                                },
                                {
                                    Header: "Streak", width: 125, id: "streak", accessor: (row) => {
                                        return this.get_streak(row)
                                    }, className: "center"
                                },
                                {
                                    Header: "Match played", width: 175, id: "played", accessor: (row) => {
                                        return this.get_matchplayed(row)
                                    }, className: "center"
                                },
                                { Header: "Region", width: 150, id: "Region", accessor: "region" },
                                {
                                    Header: "Platform", width: 150, id: "Platform", accessor: (row) => {
                                        return this.get_platform(row)
                                    }
                                }
                            ]}
                            pageSize={Leaderboard && Leaderboard.length}
                            defaultSorted={[{ id: "elo", desc: false }]}
                            showPagination={false}
                        />
                    </MDBCol>
                </MDBRow></div >);
    }
}

const mapStateToProps = (state) => {
    return { Leaderboard: state.Leaderboard, LeaderboardIsLoading: state.LeaderboardIsLoading }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        actionGetLeaderboard
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardTable);
