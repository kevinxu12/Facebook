import React, { Component } from 'react';
import post_middleware from './../../Middleware/Post';
import Post from './Post';
import CreatePost from './CreatePost';


// the news feed contains a bunch of posts 
class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.pushToNewsFeed = this.pushToNewsFeed.bind(this);
        this.removePost = this.removePost.bind(this);
    }

    // lets incrementally get all the posts at a 30 second interval
    async componentDidMount() {
        var username = localStorage.getItem("token");
        var obj = {username: username};
        var response = await post_middleware.fetchPostData(obj);
        console.log("Received post data for newsfeed");
        this.setState({data: response});
        var intervalId = setInterval(async() => {
            try {
                if(!localStorage.getItem("token")) {
                    clearInterval(intervalId);
                }
                var username = localStorage.getItem("token");
                var obj = {username: username};
                var response = await post_middleware.fetchPostData(obj);
                console.log("Received post data for newsfeed");
                this.setState({data: response});
            } catch (e) {
                console.log(e);
            }
        }, 30000);
    }

    // lets remove a post if the x is clicked
    async removePost(postID) {
        var obj = {
            creator: localStorage.getItem("token"),
            postID: postID
        }
        var response = await post_middleware.deletePost(obj);
        var newData = this.state.data.filter(x => postID !== x.postID);
        console.log(newData);
        this.setState({data: newData});

    }

    renderNewsFeed = (data) => {
        if(!data) {
            return <div> No Posts </div>
        } else {
            return data.map((postData) => {
                var uniquePostId = postData.date;
                return <Post key={uniquePostId} data= {postData} removePost={this.removePost}/>
            })
        }
    }

    // if a new post has been added, this will update dynamically
    pushToNewsFeed = (response) => {
        console.log(response.data);
        this.setState(prevState => ({
            data: [response.data, ...prevState.data]
        }));
    }

    // if you are on someone else's feed, pressing this brings you back to the home page.
    renderBack = () => {
        if(this.props.location) {
            return <div className = "blue btn-flat left white-text" onClick = {() => {
                this.props.history.goBack();
            }}></div>
        }
    }

    render () {
        const { data } = this.state;
        return (
            <div>
                <CreatePost pushToNewsFeed={this.pushToNewsFeed} username = {localStorage.getItem("token")} 
                recipient = {this.props.location ? this.props.location.state.recipient : 'none'}/>
                <div style = {{marginTop: '70px'}}>
                    {this.renderNewsFeed(data)}
                </div>
                {this.renderBack()}
            </div>
        )
    }
}
export default NewsFeed;