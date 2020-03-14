import React, { Component } from 'react'
import Chatbox from './Chatbox'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'; 

const divStyle = {
    position: 'fixed',
    bottom: '0',
    padding: '30px',
    width: '100%'
}
// chat area is a component on the bottom of the page where all the live chats will pop up
class ChatArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openChats: new Set(),
            openChatCount: 0
        }
    }

    // show all chats that a user has clicked on recently
    renderChats() {
        const path = this.props.location.pathname;
        if(path === "/feed") {
            const chat = this.props.liveChats.map((c) => <Chatbox show='true' chatroomName={c.name} sender={c.sender} key={c.name} members={c.members}/>)
            return (
                <div style={divStyle}>
                    <div id='inner-div'>
                        {chat}
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderChats()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { liveChats: state.chat};
}
export default connect(mapStateToProps)(withRouter(ChatArea));