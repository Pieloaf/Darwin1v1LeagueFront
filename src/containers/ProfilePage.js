import React, { Component } from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Stats from '../components/Stats';
import history from "../history";
import season1 from "../data/image/season1.jpg";
import Header from "../components/Header/Header";

class ProfilePage extends Component {

    componentDidMount() {
        if (!localStorage.getItem('userID')) history.push('/login')
    }
    logout() {
        localStorage.removeItem('userID')
        history.push('/home')
    }


    render() {
        return (
            <div>
                <Header />
                <MDBView src={season1}>
                    <div className="main">
                        <MDBMask className="flex-center flex-column text-white text-center">
                            <Stats />
                        </MDBMask>
                    </div>
                </MDBView>
            </div>
        );
    }

}
// const mapStateToProps = (state) => {
//     return { ProfileLoaded: state.ProfileLoaded, LoadingProfile: state.LoadingProfile }
// }

// const mapDispatchToProps = (dispatch) => ({
//     ...bindActionCreators({
//         actionGetProfile
//     }, dispatch)
// })

export default (ProfilePage);
