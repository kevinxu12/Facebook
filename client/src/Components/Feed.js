import React, { Component } from 'react'
import './Feed.css';
import NewsFeed from './Feed/NewsFeed';
import ChatBar from './Chat/ChatBar'
import Profile from './Profile/Profile'
import FriendRecommendations from './FriendRecommendations/FriendRecommendations';
import FriendRequests from './FriendRequests/FriendRequests';
//import TestButton from './Feed/TestButton'
import { connect } from 'react-redux';
import * as actions from '../actions';

// this is the home page for the feed;
class Feed extends Component {
    async componentDidMount() {
        this.props.fetchUser();
    }
    renderContent() {
        //localStorage.removeItem("token");
        var username = this.props.user;
        if(!username) {
            username = localStorage.getItem("token");
        }
        if(username) {
            return (
                <div>
                    <div className = "row"></div>
                    <div className ="row">
                        <div className = "col s3">
                            <Profile username = {username}/>
                            <FriendRecommendations username = {username} />
                            <FriendRequests username = {username} />
                        </div>
                        <div className ="col s6">
                            <NewsFeed username = {username}/>
                        </div>
                        <div className ="col s3">
                            <ChatBar username = {username}/> 
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div> Loading </div>
        }
    }
    render () {
        return ( 
            <div>
                {this.renderContent()}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return { user: state.auth};
}
export default connect(mapStateToProps, actions)(Feed);