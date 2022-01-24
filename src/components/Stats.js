import React from 'react';
import './Stats.css'
import rank from '../data/image/stats/rank.png'
import victories from '../data/image/stats/victories.png'
import defeats from '../data/image/stats/defeats.png'
import streak from '../data/image/stats/currentstreak.png'
import max_streak from '../data/image/stats/maxstreak.png'
import total_games from '../data/image/stats/totalgames.png'

import { withRouter } from "react-router-dom";
function importImages(r) {
    let obj = {};
    r.keys().map(r).forEach((img, idx) => obj[r.keys()[idx].match(/\.\/([^;]*)\.(png|jpe?g|svg)$/)[1]] = img)
    return obj;
}

const classes = importImages(require.context('../data/image/classes/', false, /\.(png|jpe?g|svg)$/))

class Stats extends React.Component {

    get_rank_text(player, rank) {
        return (rank)
        // no longer need to check games played ig
        if (player.victory + player.defeat >= 10) {
            return (rank)
        }
        else {
            return ('N/A')
        }
    }

    get_win_rate(victory, defeat) {
        if (victory + defeat) {
            return (Math.round((victory / (victory + defeat)) * 100, 2) + '%')
        }
        return ('N/A')
    }

    display_stat(stat) {
        return (
            <span className='stat'>
                <img width='35px' height='35px' src={stat.image} alt={stat.text} />
                <span className='stat-name'>{stat.text}</span>
                <span className='stat-value'>{stat.value}</span>
            </span>)
    }

    display_classes(player) {
        let imgs = [];
        Object.entries(classes).forEach(([cName, image], idx) => {
            let key = cName + '-' + idx
            let styles = !player.classes.includes(cName) ? 'class unselected' : 'class'
            imgs.push(<img key={key} className={styles} width='80px' height='80px' src={image.default} alt={cName} />)
        })
        return (
            <span className='classes'>
                {imgs}
                <span className='class-title'>Classes</span>
            </span>
        )
    }

    render() {
        return (
            <div className='stats'>
                {this.display_stat({ 'value': this.props.user.victory, 'text': 'Victories', 'image': victories })}
                {this.display_stat({ 'value': this.props.user.defeat, 'text': 'Defeats', 'image': defeats })}
                {this.display_stat({ 'value': this.props.user.victory + this.props.user.defeat, 'text': 'Total Games', 'image': total_games })}
                {this.display_stat({ 'value': this.get_win_rate(this.props.user.victory, this.props.user.defeat), 'text': 'Win Rate', 'image': rank })}
                {this.display_stat({ 'value': this.get_rank_text(this.props.user, this.props.user.q_rank), 'text': 'Qualifying Rank', 'image': rank })}
                {this.display_stat({ 'value': this.get_rank_text(this.props.user, this.props.user.g_rank), 'text': 'Global Rank', 'image': rank })}
                {this.display_stat({ 'value': this.props.user.streak, 'text': 'Streak', 'image': streak })}
                {this.display_stat({ 'value': this.props.user.max_streak, 'text': 'Max Streak', 'image': max_streak })}
                {this.display_classes(this.props.user)}
            </div>
        )
    }
}

export default withRouter(Stats);
