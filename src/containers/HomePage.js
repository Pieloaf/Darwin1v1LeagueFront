import React, { Component } from 'react';
import bgPic from "../data/image/backgroundImage.png";
import bgVid from "../data/image/Cinecut2.mp4";
import { MDBMask, MDBView } from 'mdbreact';
import Header from "../components/Header/Header";
import './HomePage.css'
import { FaDiscord } from 'react-icons/fa'
import '../data/Fonts/boxicons-2.0.7/css/boxicons.css'
import Countdown from '../components/Countdown'

const discord_link = "https://discord.gg/DBxYx7PwkS"

class HomePage extends Component {

    render() {
        return (
            <div>
                <Header />
                <MDBView >
                    <div className="main">
                        <video className="video-intro" playsInline autoPlay muted loop poster={bgPic}>
                            <source src={bgVid} type="video/mp4" />
                        </video>
                        <MDBMask overlay="black-light" className="flex-center flex-column text-white text-center">
                            <div className="main-title">
                                <h1 className="intro-text">Darwin 1v1 League</h1>
                                <h2 className="sub-text">All platforms, All regions</h2>
                                <a className="discord-btn" href={discord_link} target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
                                <Countdown/>
                            </div>
                        </MDBMask>
                    </div>
                    
                </MDBView>
            </div>
           
        );
    }
}

// Add your javascript here


var {findTimeZone, getZonedTime,} = require('timezone-support');

function fetchCountdown() {
    var urlSplit = window.location.href.split("/");
    var url = (urlSplit[0] + "/" + urlSplit[1] + "/" + urlSplit[2] + "/");
    if ((window.location.href.toLocaleLowerCase() == url) || (window.location.href.toLocaleLowerCase() == url + "home")) {
        var berlinTime = getZonedTime(new Date(), findTimeZone('Europe/Berlin'))
        var days = (-berlinTime.day + new Date(berlinTime.year, berlinTime.month, 0).getDate());
        if (days.toString().length == 1) days = 0 + "" + (-berlinTime.day + new Date(berlinTime.year, berlinTime.month, 0).getDate());
        var hours = (-berlinTime.hours + 23);
        if (hours.toString().length == 1) hours = 0 + "" + (-berlinTime.hours + 23);
        var mins = (-berlinTime.minutes + 59);
        if (mins.toString().length == 1) mins = 0 + "" + (-berlinTime.minutes + 59);
        var secs = (-berlinTime.seconds + 59);
        if (secs.toString().length == 1) secs = 0 + "" + (-berlinTime.seconds + 59);
        var countdown = (days + " ⠀ " + hours + " ⠀ " + mins + " ⠀ " + secs);
        //document.getElementById("season-info").innerHTML = "Season " + berlinTime.month + " ends in:";
        return <span>{countdown}</span>;
    }
}

function startCounting() {
try {
    setTimeout(() => {
        return fetchCountdown();
    }, 0);
        
    function loopCountdown() {
      setTimeout(function() {
        return fetchCountdown();
        var infinity = 0;
        if (infinity < 1) {
         loopCountdown();
        }
      }, 250)                             
    }
    loopCountdown(); 
} catch (error) {
    console.log("TryCatch Error: | " + error + " |");
}

}
  


export default HomePage;
