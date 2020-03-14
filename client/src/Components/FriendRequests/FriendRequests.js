import React, { Component } from 'react';
import friendReq_middleware from '../../Middleware/FriendReq';
import IncomingFriendRequest from './IncomingFriendRequest';
import OutgoingFriendRequest from './OutgoingFriendRequest';
import { connect } from 'react-redux';

// this is a component for all friend requests you have received and are sending out
class FriendRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incomingFriendRequests: [],
            outgoingFriendRequests: []
        }
        this.removeAcceptedFriendRequest = this.removeAcceptedFriendRequest.bind(this);
        this.renderIncomingContent = this.renderIncomingContent.bind(this);
        this.renderOutgoingContent = this.renderOutgoingContent.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    

    async componentDidMount() {
        var obj = {username: this.props.username};
        var incomingFriendRequests = await friendReq_middleware.getAllIncomingFriendRequests(obj);
        var outgoingFriendRequests = await friendReq_middleware.getAllSentFriendRequests(obj);
        console.log(incomingFriendRequests);
        console.log(outgoingFriendRequests);
        this.setState({incomingFriendRequests: incomingFriendRequests,
        outgoingFriendRequests: outgoingFriendRequests})
    }

    removeAcceptedFriendRequest(username) {
        console.log(username);
        var newFriendRequests = this.state.incomingFriendRequests.filter((friendRequest) => friendRequest !== username);
        this.setState({incomingFriendRequests: newFriendRequests})
    }

    renderIncomingContent() {
        return this.state.incomingFriendRequests.map((friendRequest) => {
            var recipient = friendRequest;
            var key = this.props.username + recipient;
            return <IncomingFriendRequest sender = {this.props.username} recipient = {recipient} key = {key}
            removeAcceptedFriendRequest = {this.removeAcceptedFriendRequest}/>
        })
    }

    renderOutgoingContent() {
        return this.state.outgoingFriendRequests.map((recipient) => {
            return <OutgoingFriendRequest recipient = {recipient}/>
        })
    }

    renderOutgoingContentFromProps() {
        if(this.props.friendRequests) {
            return this.props.friendRequests.map((recipient) => {
                return <OutgoingFriendRequest recipient = {recipient}/>
            })
        }
    }

    render () {
        return (
            <div style = {{backgroundColor: "lightBlue", 
            paddingTop: "2px", paddingBottom: "2px",
            paddingLeft: "2px", paddingRight: "2px"}}>
                <h4>Friend Requests! </h4>
            {this.renderIncomingContent()}
            {this.renderOutgoingContent()}
            {this.renderOutgoingContentFromProps()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {friendRequests: state.friendRequests};
}

export default connect(mapStateToProps)(FriendRequests);