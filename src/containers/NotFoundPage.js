import React, { Component } from 'react';
import history from "../history";

class NotFoundPage extends Component {

    onClickHome() {
        history.push('/home')
    }

    render() {
        return (
            <div>
                ERROR 404: Page not found.
                <br/>
                <button onClick={this.onClickHome}>
                    Home
                </button>
            </div>
        )
    }
}

export default NotFoundPage