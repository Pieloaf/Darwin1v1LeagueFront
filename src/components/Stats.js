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
import jetwings from '../data/image/stats/jetwings.png'
import nojetwings from '../data/image/stats/nojetwings.png'
import headhunter from '../data/image/stats/headhunter.png'
import noheadhunter from '../data/image/stats/noheadhunter.png'
import grapple from '../data/image/stats/grapple.png'
import nograpple from '../data/image/stats/nograpple.png'
import winner from '../data/image/pfp-tags/winner.png'

import { withRouter } from "react-router-dom";


class Stats extends React.Component {


    componentDidMount() {
        this.props.actionGetProfile(this.props.user_id)
    }
    componentDidUpdate(prevProps) {
        if (this.props.user_id !== prevProps.user_id) {
            this.props.actionGetProfile(this.props.user_id)
        }
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
        if (player.victory + player.defeat >= 10){
        return <div className="elo-rank">
                <div className={"profile-rank-badge " + rank[0]} style={{ backgroundColor: rank[2] }}>
                    {rank[0]}
                </div>
                <h2 style={{ fontFamily: 'Rift', padding: '0px 10px', marginTop:'5px' }}>{player.elo}</h2>
            </div>}
        else {
            return <div className="elo-rank">
                <div className={"profile-rank-badge"} style={{ backgroundColor: '#777777' }}>
                    Unranked
                </div>
            </div>
        }
    }

    get_rank_text(player, rank){
        if (player.victory + player.defeat >= 10){
            return (rank)
        }
        else{
            return('N/A')
        }
    }

    display_stat(stat){
        return (
        <span className='stat'>
            <img width='40px' height='40px' src={stat.image} alt={stat.text}/>
            <span className='stat-name'>{stat.text}</span>
            <span className='stat-value'>{stat.value}</span>
        </span>)
    }

    display_classes(player){
        let g = nograpple 
        let h = noheadhunter
        let j = nojetwings
        if (player.player_classes.includes('grapple')) g = grapple
        if (player.player_classes.includes('headhunter')) h = headhunter
        if (player.player_classes.includes('jetwings')) j = jetwings
        return(
            <span className='classes'>
                <img className="class" width='80px' height='80px' src={j} alt='grapple'/>
                <img className="class" width='80px' height='80px' src={g} alt='headhunter'/>
                <img className="class" width='80px' height='80px' src={h} alt='jetwings'/>
                <span className='class-title'>Classes</span>
            </span>
        )
    }
    userNotFound(){
        if (this.props.user_id == localStorage.getItem('userID')){
            return (<div className="join-up">
                <span style={{fontFamily:'Rift', fontSize:'32px'}}>Looks like you're not yet in the league.</span>
                <a href="https://discord.gg/DBxYx7PwkS" target="_blank" rel="noopener noreferrer">Click here to join</a>
                 </div>)}
        return <span style={{fontFamily:'Rift', fontSize:'32px'}}>User Not Found</span>
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
        if (ProfileLoaded && ProfileLoaded.length <= 1) return (<div>{this.userNotFound()}</div>)
        if (ProfileLoaded && ProfileLoaded.length > 1)
        return(
            <div className="profile">
                <div className="profile-card">
                    {this.display_avatar(ProfileLoaded[0])}
                    <div className="basic-info">
                        {this.display_username(ProfileLoaded[0])}
                        <div className="lower-half">
                            {this.display_elo(ProfileLoaded[0])}
                            <div className="platform-region-container">
                                {this.display_platform(ProfileLoaded[0])}{this.display_region(ProfileLoaded[0])}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ukelele">
                    <span className='stats-title'>Stats</span>
                    <div className='stats'>
                        {this.display_stat({'value':ProfileLoaded[0].victory, 'text':'Victories', 'image':victories})}
                        {this.display_stat({'value':ProfileLoaded[0].defeat, 'text':'Defeats', 'image':defeats})}
                        {this.display_stat({'value':ProfileLoaded[0].victory+ProfileLoaded[0].defeat, 'text':'Total Games', 'image':total_games})}
                        {this.display_stat({'value':Math.round((ProfileLoaded[0].victory / (ProfileLoaded[0].victory + ProfileLoaded[0].defeat)) * 100, 2)+'%', 'text':'Win Rate', 'image':rank})}
                        {this.display_stat({'value':this.get_rank_text(ProfileLoaded[0], ProfileLoaded[0].q_rank), 'text':'Qualifying Rank', 'image':rank})}
                        {this.display_stat({'value':this.get_rank_text(ProfileLoaded[0], ProfileLoaded[0].g_rank), 'text':'Global Rank', 'image':rank})}
                        {this.display_stat({'value':ProfileLoaded[0].streak, 'text':'Streak', 'image':streak})}
                        {this.display_stat({'value':ProfileLoaded[0].max_streak, 'text':'Max Streak', 'image':max_streak})}  
                        {this.display_classes(ProfileLoaded[1])}                 
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
