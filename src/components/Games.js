import React from 'react';
import './Games.css'


class Games extends React.Component {

    get_opponent(game, user_id) {
        if (user_id === game.winner_id) {
            return (<a href={'/profile/' + game.loser_id}>{game.loser}</a>)
        }
        return (<a href={'/profile/' + game.winner_id}>{game.winner}</a>)
    }
    get_elo_change(game, user_id) {
        if (game.num_row < 1) return 'N/A'
        if (user_id === game.winner_id) {
            return ('+' + game.elo_gain)
        }
        return ('-' + game.elo_loss)
    }
    get_bg_colour(game, user_id) {
        if (user_id === game.winner_id) {
            return '#46ab46a1'
        }
        return '#ab3636e6'
    }

    display_row(games) {
        let rows = []
        let row
        games.pop()
        games.forEach((game, idx) => {
            let key = `game-${idx}`
            row = []
            row.push(<span key={`id-${idx}`} className='id-col'>{game.num_row}</span>)
            row.push(<span key={`elo-${idx}`} className='elo-change-col'>{this.get_elo_change(game, this.props.user_id)}</span>)
            row.push(<span key={`opp-${idx}`} className='opponent-col'>{this.get_opponent(game, this.props.user_id)}</span>)
            row.push(<span key={`dt-${idx}`} className='date-col'>{new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "numeric",
                day: "2-digit",
                hour: "numeric",
                minute: "numeric"
            }).format(new Date(game.timestamp))}</span>)
            rows.push(<span key={key} style={{ backgroundColor: this.get_bg_colour(game, this.props.user_id) }} className='game-row'>{row}</span>)
        })
        return (rows)
    }

    render() {
        if (!this.props.games.length) return (
            <div className="games-not-found">
                <h1>No Games Found</h1>
            </div>);
        return (
            <div className='game-rows'>
                {this.display_row(this.props.games)}
            </div>
        )
    }
}

export default Games;
