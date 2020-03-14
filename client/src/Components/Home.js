import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';

// this is the home page
class Home extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render () {
        // have some bug when I try to fetch User;
        var user = localStorage.getItem("token");
        if(user) {
            return (
            <div>
                    <Redirect to="/feed" />
            </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="section no-pad-bot" id="index-banner">
                        <div className="container">
                            <h1 className="header center blue-text">Pennbook</h1>
                            <div className="row center">
                                <h5 className="header col s12 light">Meet the Team!</h5>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                    <div className="row">
                        <div className="col s12 m4">
                        <div className="icon-block">
                        <img className = "center" alt = "taki" style ={{flex: 1, width: "100%", height: "100%", resizeMode: 'contain', verticalAlign: 'middle'}} src = {require('./Images/Taki.jpg')}></img>
                            <h5 className="center">Taki</h5>
                            <p className="light">Taki is a guy who Daniel introduced me to</p>
                        </div>
                        </div>

                        <div className="col s12 m4">
                        <div className="icon-block">
                            <img className = "center" alt = "matt" style ={{flex: 1, width: "100%", height: "100%", resizeMode: 'contain', verticalAlign: 'middle'}} src = {require('./Images/Matt.jpg')}></img>
                            <h5 className="center">Kevin</h5>

                            <p className="light">Kevin is a guy who is doing the front end</p>
                        </div>
                        </div>
                        <div className="col s12 m4">
                        <div className="icon-block">
                            <img className = "center" alt = "matt" style ={{flex: 1, width: "100%", height: "100%", resizeMode: 'contain', verticalAlign: 'middle'}} src = {require('./Images/Matt.jpg')}></img>
                            <h5 className ="center">Matt</h5>
                            <p className = "light">Matt goes to church, and will not be a roomie next year lel</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return { user: state.auth};
}
export default connect(mapStateToProps, actions)(Home);