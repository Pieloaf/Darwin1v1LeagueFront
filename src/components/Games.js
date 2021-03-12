import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionGetGames } from '../actions/ProfileActions'
import { loaders } from './loaders'
import './Games.css'


class Games extends React.Component {


    componentDidMount() {
        this.props.actionGetGames(this.props.user_id)
    }

    get_opponent(game, user_id){
        if (user_id == game.winner_id){
            return (game.loser)}
        return (game.winner)
    }
    get_elo_change(game, user_id){
        if (game.num_row <= 10) return 'N/A'
        if (user_id == game.winner_id){
            return ('+'+game.elo_gain)}
        return ('-'+game.elo_loss)
    }
    get_bg_colour(game, user_id){
        if (user_id == game.winner_id){
            return '#46ab46a1'
        }
        return '#ab3636e6'
    }

    display_row(games){
        let rows = []
        let row
        let user = games[games.length-1]
        games.pop() 
        games.forEach( game =>{
            row = []
            row.push(<span className='id-col'>{game.num_row}</span>)
            row.push(<span className='elo-change-col'>{this.get_elo_change(game, user.user_id)}</span>)
            row.push(<span className='opponent-col'>{this.get_opponent(game, user.user_id)}</span>)
            row.push(<span className='date-col'>{new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
                hour:"numeric",
                minute:"numeric"
              }).format(new Date(game.timestamp))}</span>)
            rows.push(<span style={{backgroundColor: this.get_bg_colour(game, user.user_id)}} className='game-row'>{row}</span>)}
        )
        return(rows)
    }

    render() {
        const {GamesLoaded, LoadingGames} = this.props
        if (LoadingGames) return (
            <div>
                <h1>Beep Boop... Loading Games :)</h1>
                {loaders[Math.floor(Math.random() * loaders.length)]}
            </div>
        )
        if (GamesLoaded === -1) return (<h2>ehhh... something's not right :/</h2>)
        if (GamesLoaded && GamesLoaded.length <= 1) return (<div></div>)
        if (GamesLoaded && GamesLoaded.length > 1)
        return(
            <div className="games-container">
                <span className="games-title">Match History</span>
                    <div className="col-titles">
                        <span className="id-col">game</span>
                        <span className="elo-change-col">Elo</span>
                        <span className="opponent-col">Opponent</span>
                        <span className="date-col">Date</span>
                    </div>
                    <div className="games">
                        <div className='game-rows'>
                            {this.display_row(GamesLoaded)}
                    </div>
                </div>
            </div>)
        return(<div></div>)
    }
}

const mapStateToProps = (state) => {
    return {GamesLoaded: state.GamesLoaded, LoadingGames: state.LoadingGames }
}

const mapDispatchToProps = (dispatch) => ({
                ...bindActionCreators({
                    actionGetGames
                }, dispatch)
            })

export default connect(mapStateToProps, mapDispatchToProps)((Games));
