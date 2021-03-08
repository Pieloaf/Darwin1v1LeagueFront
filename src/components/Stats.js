import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionGetProfile } from '../actions/ProfileActions'
import { loaders } from './loaders'
import './Stats.css'
import flagNA from '../data/image/logos/na.png'
import flagEU from '../data/image/logos/eu.png'
import flagUN from '../data/image/logos/un.png'
import steamLogo from '../data/image/logos/PC.png'
import XboxLogo from '../data/image/logos/Xbox.png'
import PS4Logo from '../data/image/logos/PS4.png'
import rank from '../data/image/stats/rank.png'
import victories from '../data/image/stats/victories.png'
import defeats from '../data/image/stats/defeats.png'
import streak from '../data/image/stats/currentstreak.png'
import max_streak from '../data/image/stats/maxstreak.png'
import total_games from '../data/image/stats/totalgames.png'

import { withRouter } from "react-router-dom";


class Stats extends React.Component {


    componentDidMount() {
        if (localStorage.getItem('userID')) this.props.actionGetProfile(localStorage.getItem('userID'))
    }

    display_avatar(player) {
        return <span className="avatar-container">
            <img className="profile-avatar" src={player.avatar_url} alt="avatar" />
        </span>
    }
    display_username(player) {
        return <span className="user-name">
            {player.user_name}
        </span>
    }

    display_platform(player) {
        const src = player.platform === 'PC' ? steamLogo : player.platform === 'Xbox' ? XboxLogo : player.platform === 'PS4' ? PS4Logo : flagUN
        return <span className="platform-container">
            Platform:
            <span className="icon-container"><img className="icons" width="40px" height="40px" src={src} alt="region" /></span>
        </span>
    }
    display_region(player) {
        const src = player.region === 'EU' ? flagEU : player.region === 'NA-East' ? flagNA : flagUN
        return <span className="region-container">
                Region:
                <span className="icon-container"><img className="icons" width="40px" height="40px" src={src} alt="region" /></span>
            </span>
    }
    get_rank_and_color_from_elo(elo) {
        const rolesValues = [
            ["Legend", 1500, "rgba(255, 0, 7, 1)"],
            ["Master", 1300, "rgba(240, 79, 248, 0.65)"],
            ["Diamond", 1200, "rgba(0, 227, 255, 0.75)"],
            ["Platinum", 1100, "rgba(18, 116, 54, 1)"],
            ["Gold", 1000, "rgba(242, 167, 37, 1)"],
            ["Silver", 900, "rgba(219, 218, 218, 0.7)"],
            ["Bronze", 800, "rgba(128, 65, 18, 1)"],
            ["Steel", 700, "rgba(160, 160, 160, 1)"],
            ["Inmate", 500, "rgba(235, 105, 39, 1)"]
        ]
        for (let i = 0; i < rolesValues.length; i++)
            if (elo >= rolesValues[i][1])
                return rolesValues[i]
    }

    display_elo(player) {
        const rank = this.get_rank_and_color_from_elo(player.elo)
        return <div className="elo-rank">
                <div className={"profile-rank-badge " + rank[0]} style={{ backgroundColor: rank[2] }}>
                    {rank[0]}
                </div>
                <h2 style={{ fontFamily: 'Rift', padding: '0px 10px', marginTop:'5px' }}>{player.elo}</h2>
            </div>
    }


    display_stat(stuff){
        console.log(stuff)
        return (
        <span className='stat'>
            <img width='35px' height='35px' src={stuff.image} alt={stuff.text}/>
            <span className='stat-name'>{stuff.text}</span>
            <span className='stat-value'>{stuff.value}</span>
        </span>)
    }
    render() {
        const {ProfileLoaded, LoadingProfile} = this.props
        if (LoadingProfile) return (
            <div>
                <h1>Beep Boop... Loading Profile :)</h1>
                {loaders[Math.floor(Math.random() * loaders.length)]}
            </div>
        )
        if (ProfileLoaded === -1) return (<h2>ehhh... something's not right :/</h2>)
        if (ProfileLoaded)
        return(
            <div className="profile">
                <div className="profile-card">
                    {this.display_avatar(ProfileLoaded)}
                    <div className="basic-info">
                        {this.display_username(ProfileLoaded)}
                        <div className="beep-boop">
                            {this.display_elo(ProfileLoaded)}
                            <div className="platform-region-container">
                                {this.display_platform(ProfileLoaded)}{this.display_region(ProfileLoaded)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ukelele">
                    <div className='raid-shadow-legends'>Stats</div>
                    <div className='stats'>
                        {this.display_stat({'value':ProfileLoaded.victory, 'text':'Victories', 'image':victories})}
                        {this.display_stat({'value':ProfileLoaded.defeat, 'text':'Defeats', 'image':defeats})}
                        {this.display_stat({'value':ProfileLoaded.victory+ProfileLoaded.defeat, 'text':'Total Games', 'image':total_games})}
                        {this.display_stat({'value':Math.round((ProfileLoaded.victory / (ProfileLoaded.victory + ProfileLoaded.defeat)) * 100, 2)+'%', 'text':'Win Rate', 'image':rank})}
                        {this.display_stat({'value':ProfileLoaded.q_rank, 'text':'Qualifying Rank', 'image':rank})}
                        {this.display_stat({'value':ProfileLoaded.g_rank, 'text':'Global Rank', 'image':rank})}
                        {this.display_stat({'value':ProfileLoaded.streak, 'text':'Streak', 'image':streak})}
                        {this.display_stat({'value':ProfileLoaded.max_streak, 'text':'Max Streak', 'image':max_streak})}
                        {this.display_stat({'value':ProfileLoaded.max_streak, 'text':'Max Streak', 'image':max_streak})}
                        {this.display_stat({'value':ProfileLoaded.max_streak, 'text':'Max Streak', 'image':max_streak})}
                        {this.display_stat({'value':ProfileLoaded.max_streak, 'text':'Max Streak', 'image':max_streak})}
                        {this.display_stat({'value':ProfileLoaded.max_streak, 'text':'Max Streak', 'image':max_streak})}
                    </div>
                </div>
            </div>)
        return(<div></div>)
    }
}

const mapStateToProps = (state) => {
    return {ProfileLoaded: state.ProfileLoaded, LoadingProfile: state.LoadingProfile }
}

const mapDispatchToProps = (dispatch) => ({
                ...bindActionCreators({
                    actionGetProfile
                }, dispatch)
            })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stats));
