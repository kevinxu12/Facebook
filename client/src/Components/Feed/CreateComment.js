import React, { Component } from 'react'
import './CreateComment.css';
import Comment from './../../Middleware/Comment';

// this component deals with how to make a new comment for each post
class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleContentChange(event) {
        this.setState({content: event.target.value})
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Creating Comment");
        var timeOfComment = new Date().toUTCString();

        var postID = this.props.postID;
        var creator = this.props.creator;
		var date = this.props.postDate;
        var content = this.state.content;
        var postDate = timeOfComment;
        var obj = {
            postID: postID,
            postDate: postDate,
            creator: creator,
            date: date,
            content: content 
        }
        Comment.createComment(obj, (response) => {
            this.props.updateCommentSection(response);
        });

    }

    render () {
        return (
            <article className ="CreateComment">
                <form onSubmit = {this.handleSubmit}>
                    <div className = "CreateCommentRow">
                        <label> Create Comment </label><input className = "CreateCommentInput" value = {this.state.content} onChange = {this.handleContentChange}/>
                        <button type = "submit" className = "blue btn-flat right white-text"> 
                            Post
                            <i className="material-icons right"> done </i>
                        </button>
                    </div>
                </form>
            </article>
        )
    }
}

export default CreateComment;