import React from 'react';
import Header from "../components/Header/Header";
import LeaderBoardTable from "../components/LeaderBoardTable";
import './Leaderboard.css'
import { MDBNav, MDBNavItem, MDBLink } from 'mdbreact';
import history from "../history";


class LeaderboardPage extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.region) {
            this.state = { activeItemPills: this.props.region };
        }
        else {
            this.state = { activeItemPills: '' };
        }
    }
    togglePills = region => () => {
        const { activePills } = this.state;
        if (activePills !== region) {
            this.setState({
                activeItemPills: region
            });
            if (this.props.platform) {
                history.push(`/leaderboard/${this.props.platform}/${region}`)
            } else {
                history.push(`/leaderboard/global/${region}`)
            }
        }
    };
    render() {
        const { activeItemPills } = this.state;

        return (
            <div>
                <Header />
                <div className="leaderboard-page">
                    <div className="module-border-wrap">
                        <span className="leaderboard-title">
                            {this.props.platform} Leaderboards
                        </span>
                        <MDBNav className='nav-pills'>
                            <MDBNavItem>
                                <MDBLink to='#' active={activeItemPills === ''} onClick={this.togglePills('')} link>Global</MDBLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBLink to='#' active={activeItemPills === 'eu'} onClick={this.togglePills('eu')} link>EU</MDBLink>
                            </MDBNavItem>
                            <MDBNavItem>
                                <MDBLink to='#' active={activeItemPills === 'na-east'} onClick={this.togglePills('na-east')} link>NA</MDBLink>
                            </MDBNavItem>
                        </MDBNav>
                    </div>
                    <div className="leaderboard_container">
                        <LeaderBoardTable platform={this.props.platform} region={this.props.region} />
                    </div>
                </div>
            </div>
        );
    }
}

export default LeaderboardPage;