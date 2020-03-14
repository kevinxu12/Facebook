import React, { Component } from 'react'
import './CommentSection.css'
import CreateComment from './CreateComment';
import Comment from './Comment';
import comment_middleware from './../../Middleware/Comment';

// the component for a comment section for a specific post
class CommentSection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    // fetch the comment data
    async componentDidMount() {
        var obj = {postID: this.props.postID, date: this.props.postDate};
        var response = await comment_middleware.fetchCommentData(obj);
        //console.log(response);
        this.setState({data: response});
    }

    renderComments = (data) => {
        if(!data) {
            return <div> No Comments </div>
        } else {
            return data.map((postData) => {
                return <Comment key={postData.date} data= {postData}/>
            })
        }
    }
    
    // if you create a comment, this will ensure that the comment updates dynamically
    updateCommentSection = response => {
        this.setState(prevState => ({
            data: [response.data[0], ...prevState.data]
        }));
    }

    render () {
        var { data } = this.state;
        return (
            <div>
                <article className = "CommentSection">
                    <div>
                        {this.renderComments(data)}
                    </div>
                    <CreateComment updateCommentSection = {this.updateCommentSection} postID = {this.props.postID} postDate = {this.props.postDate} creator = {this.props.creator}/>
                </article>
            </div> 
        )
    }
}

export default CommentSection;