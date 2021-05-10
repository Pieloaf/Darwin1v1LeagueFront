import React, { Component } from 'react';
import { MDBMask, MDBView } from 'mdbreact';
import Header from "../components/Header/Header";
import './PatchNotesPage.css'
import season1 from "../data/image/season1.jpg";
import season2 from "../data/image/season2.jpg";
import season3 from "../data/image/season3.jpg";
import season5 from "../data/image/season5.jpg"
import { actionGetPatchNotes } from "../actions/PatchNotesActions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class PatchNotesPage extends Component {
    componentDidMount() {
        this.props.actionGetPatchNotes(this.props.season)
    }
    componentDidUpdate(prevProps) {
        if (this.props.season !== prevProps.season) {
            this.props.actionGetPatchNotes(this.props.season)
        }
    }
    getBg() {
        if (this.props.season === 'season-1') {
            return (season1)
        } else if (this.props.season === 'season-2') {
            return (season2)
        } else if (this.props.season === 'season-3') {
            return (season3)
        } else if (this.props.season === 'season-5') {
            return (season5)
        }

    }

    displayPatches(json) {
        if (json) {
            let notes = []
            for (let title in json.Content) {
                let note = []
                json.Content[title].forEach(topic => {
                    for (let heading in topic) {
                        note.push([<li className='PatchTitle'>{heading}<ul className='PatchUl'><li className='PatchDesc'>{topic[heading]}</li></ul></li>])
                    }
                });
                notes.push(<h2 className='PatchSection'>{title}</h2>, <ol className='Patch'>{note}</ol>)
            }
            return (notes)
        }
    }
    getDate(json) {
        if (json) {
            return (<h2 className='patch-date'>{json.Date}</h2>)
        }
    }

    render() {

        const { Patches, LoadingPatches } = this.props
        if (LoadingPatches) return (<div></div>)
        return (
            <div>
                <Header />
                <MDBView src={this.getBg()}>
                    <div className="main">
                        <MDBMask className="flex-center flex-column text-white text-center">
                            <div className="patch-notes-card">
                                <h1 className="patch-title">Patch Notes: {this.props.season.replace('-', ' ')}</h1>
                                {this.getDate(Patches)}
                                <div className='notes'>
                                    {this.displayPatches(Patches)}
                                </div>
                            </div>
                        </MDBMask>
                    </div>
                </MDBView>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { Patches: state.Patches, LoadingPatches: state.LoadingPatches }
}

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({
        actionGetPatchNotes
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(PatchNotesPage);
