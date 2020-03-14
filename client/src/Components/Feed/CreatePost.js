import React, { Component } from 'react'
import './CreatePost.css'
import post_middleware from './../../Middleware/Post'; 
import notification_middleware from './../../Middleware/Notifications';

import { connect } from 'react-redux';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCaptionChange = this.handleCaptionChange.bind(this);
    }

    handleCaptionChange(event) {
        this.setState({caption: event.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Creating post");
        // format of date is in UTC Time;
        var timeOfPost = new Date().toUTCString();
        var obj = {
            content: this.state.caption,
            recipient: this.props.recipient,
            date: timeOfPost,
            creator: this.props.username
        }
        post_middleware.createPost(obj, (response) => {
            console.log(response);
            this.props.pushToNewsFeed(response);
        });
        
        var notification = {
            username: this.props.username,
            date: timeOfPost,
            notification: this.props.username + " created post at " + timeOfPost
        }
        notification_middleware.addNewNotification(notification);
    }
    render() {
        //console.log(this.props.friends);
        return (
            <div>
                <article className="CreatePost" ref="CreatePost">
                    <div className = "CreatePost-header">
                        <span> Create Post! </span>
                    </div>
                    <form onSubmit = {this.handleSubmit}>
                        <div><label> Insert a Caption </label><input value = {this.state.caption} onChange = {this.handleCaptionChange}/></div>
                        <button style = {{width: "100%"}} type = "submit" className = "blue btn-flat right white-text"> 
                            Post
                            <i className="material-icons right"> done </i>
                        </button>
                    </form>
                </article>
            </div>
        ) ;
    }
}

function mapStateToProps(state){
    return { friends: state.friends }
}

export default connect(mapStateToProps)(CreatePost);