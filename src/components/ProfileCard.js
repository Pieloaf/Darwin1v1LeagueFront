import React from 'react';
import './ProfileCard.css'
import flagNA from '../data/image/logos/na.png'
import flagEU from '../data/image/logos/eu.png'
import flagUN from '../data/image/logos/un.png'
import steamLogo from '../data/image/logos/platform/PC.png'
import XboxLogo from '../data/image/logos/platform/Xbox.png'
import PS4Logo from '../data/image/logos/platform/PS4.png'
import winner from '../data/image/pfp-tags/winner.png'

import { withRouter } from "react-router-dom";
function importImages(r) {
    let obj = {};
    r.keys().map(r).forEach((img, idx) => obj[r.keys()[idx].match(/\.\/([^;]*)\.(png|jpe?g|svg)$/)[1]] = img)
    return obj;
}
const pfp = importImages(require.context('../data/image/default-pfp/', false, /\.(png|jpe?g|svg)$/))
class ProfileCard extends React.Component {

    defaultImage(ev) {
        ev.target.src = pfp[Math.round(Math.random())].default;
    }
    display_avatar(player) {
        if (player.achievements.includes('winner') || player.achievements.includes('champion')) {
            return <span style={{ position: 'relative' }} className="avatar-container">
                <img style={{ zIndex: '1', position: 'absolute', top: 0, right: '15px', width: '36px', height: '36px' }} src={winner} alt="winner" />
                <img className="profile-avatar" onError={this.defaultImage} src={player.avatar_url} alt="avatar" />
            </span>
        }
        else {
            return <span style={{ position: 'relative' }} className="avatar-container">
                <img className="profile-avatar" onError={this.defaultImage} src={player.avatar_url} alt="avatar" />
            </span>
        }
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
        if (player.victory + player.defeat >= 1) {
            return <div className="elo-rank">
                <div className={"profile-rank-badge " + rank[0]} style={{ backgroundColor: rank[2] }}>
                    {rank[0]}
                </div>
                <h2 style={{ fontFamily: 'Rift', padding: '0px 10px', marginTop: '5px' }}>{player.elo}</h2>
            </div>
        }
        else {
            return <div className="elo-rank">
                <div className={"profile-rank-badge"} style={{ backgroundColor: '#777777' }}>
                    Unranked
                </div>
            </div>
        }
    }


    render() {
        return (
            <div className="profile-card">
                {this.display_avatar(this.props.user)}
                <div className="basic-info">
                    {this.display_username(this.props.user)}
                    <div className="lower-half">
                        {this.display_elo(this.props.user)}
                        <div className="platform-region-container">
                            {this.display_platform(this.props.user)}{this.display_region(this.props.user)}
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(ProfileCard);
