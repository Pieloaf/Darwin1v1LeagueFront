import React from 'react';
import './Countdown.css'
import {findTimeZone, getZonedTime,} from 'timezone-support';

class Countdown extends React.Component {
    
    constructor(props)
    {
        super(props)
        this.state = {
            days:0,
            hours:0,
            mins:0,
            secs:0
        }
    }
    componentDidMount() {
        this.interval = setInterval(() =>  this.fetchCountdown())
    }



    fetchCountdown() {
        // var urlSplit = window.location.href.split("/");
        // var url = (urlSplit[0] + "/" + urlSplit[1] + "/" + urlSplit[2] + "/");
        // if ((window.location.href.toLocaleLowerCase() == url) || (window.location.href.toLocaleLowerCase() == url + "home")) {
        var berlinTime = getZonedTime(new Date(), findTimeZone('Europe/Berlin'))
        var days = (-berlinTime.day + new Date(berlinTime.year, berlinTime.month, 0).getDate());
        if (days.toString().length == 1) days = 0 + "" + (-berlinTime.day + new Date(berlinTime.year, berlinTime.month, 0).getDate());
        var hours = (-berlinTime.hours + 23);
        if (hours.toString().length == 1) hours = 0 + "" + (-berlinTime.hours + 23);
        var mins = (-berlinTime.minutes + 59);
        if (mins.toString().length == 1) mins = 0 + "" + (-berlinTime.minutes + 59);
        var secs = (-berlinTime.seconds + 59);
        if (secs.toString().length == 1) secs = 0 + "" + (-berlinTime.seconds + 59);
        // var countdown = (days + " ⠀ " + hours + " ⠀ " + mins + " ⠀ " + secs);
        //document.getElementById("season-info").innerHTML = "Season " + berlinTime.month + " ends in:";
        this.setState({            
            days:days,
            hours:hours,
            mins:mins,
            secs:secs})
        return
    }


    
    render() {
        // var berlinTime = getZonedTime(new Date(), findTimeZone('Europe/Berlin'))
       return <div className="countdown-Containter">
       <h3 id="season-info">Season {getZonedTime(new Date(), findTimeZone('Europe/Berlin')).month} ends in:</h3>
       <span className="time-container">
           <span className="time-item"><h1 className="number">{this.state.days}</h1><h2 className="unit">days</h2></span>
           <span className="time-item"><h1 className="number">{this.state.hours}</h1><h2 className="unit">hours</h2></span>
           <span className="time-item"><h1 className="number">{this.state.mins}</h1><h2 className="unit">mins</h2></span>
           <span className="time-item"><h1 className="number">{this.state.secs}</h1><h2 className="unit">secs</h2></span></span>
   </div>
    }
}




export default Countdown;
