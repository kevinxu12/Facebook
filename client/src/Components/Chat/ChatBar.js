import React, { Component } from 'react'
import chatbar_middleware from '../../Middleware/ChatBar';
import Chat from './Chat';
import './ChatBar.css';
import * as actions from '../../actions';
import { connect } from 'react-redux';

// Renders the chat bar component on the side;
class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chatrooms: [],
            show: false
        }
        this.handleGetChats = this.handleGetChats.bind(this);
        this.renderChatrooms = this.renderChatrooms.bind(this);
    }
    
    // ensures that we are periodically getting friends who are online;
    async componentDidMount() {
        var username = this.props.username
        var obj = { username: username};
        var result = await chatbar_middleware.fetchAllOnlineFriends(obj);
        console.log(result);
        this.setState({ data: result });

        var intervalId = setInterval(async () => {
            if(this.props.username) {
                clearInterval(intervalId);
            } else {
                var obj = {username: username};
                const c = await chatbar_middleware.getChatrooms(obj);
                const friendos = await chatbar_middleware.fetchAllOnlineFriends({ username: this.props.username });
                this.setState({chatrooms: c, data:friendos});
            }
        }, 5000)
    }

    // render based off who is online;
    renderOnlineFriends = (data) => {
        if (!data) {
            return <div> No Active Friends Online </div>
        } else {
            return data.map((postData) => {
                return <Chat key={postData} chatRecipient={postData} username={this.props.username} />
            })
        }
    }

    // handles the input where you can type a friend and get a chat with that friend
    handleChange = (event) => {
        this.refs.errorArea.textContent = '';
        if (event.which === 13 && this.refs.textarea.value) {
            let friends = this.refs.textarea.value.split(',').map(friend => friend.trim());
            if (friends.every((friend) => {
                if (!this.props.friends.includes(friend)) {
                    this.refs.errorArea.textContent = friend + ' is not your friend'
                    return false;
                }
                return true;
            })) {
                friends.push(this.props.username);
                this.props.addChat(this.props.username, friends);
                this.refs.textarea.value = '';
            }
        }
    }

    handleGetChats = async () => {
        const c = await chatbar_middleware.getChatrooms();
        this.setState({chatrooms: c, show: !this.state.show});
        console.log(this.state.show);
        console.log(c);
    }

    renderChatrooms = () => {
        console.log(this.state.chatrooms);
    }


    render() {
        const { data, chatrooms } = this.state;
        const { addChat, username } = this.props;
        return (
            <div>
                <h5> Chat Active Friends </h5>
                {this.renderOnlineFriends(data)}
                <div id='chatsearch'>🔍: 
                    <span><input id='friendFind' ref='textarea' type="text" name="username" onKeyPress={this.handleChange} autoComplete='off'></input></span>
                    <span id='groupChat' onClick={this.handleGetChats}>💬</span>
                </div>
                <span id='errorArea' ref="errorArea"></span>
                {
                    this.state.show && <ul>
                        {
                            chatrooms.map(chat => <li onClick={async () => {
                                const ppl = chat.chatroomID.split(',').map(a => a.trim()).filter(a => a !== '');
                                addChat(username, ppl);
                                await chatbar_middleware.viewChatroom({chatroomID: chat.chatroomID});
                            }} style={ chat.new !== 'true' ? { fontWeight: 'normal' } : { fontWeight: 'bold' } } >{chat.chatroomID}</li>)
                        }
                    </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        friends: state.friends,
        username: state.auth
    }
);

export default connect(mapStateToProps, actions)(ChatBar);