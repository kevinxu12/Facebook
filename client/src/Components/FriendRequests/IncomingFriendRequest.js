import React, { Component } from 'react';
import friendReq_middleware from '../../Middleware/FriendReq';
class IncomingFriendRequest extends Component {
    handleAccept = async (e) => {
        e.preventDefault();
        console.log("Adding as friend now");
        // formatted from ,to
        var obj = {
            sender: this.props.recipient,
            username: this.props.sender
        }
        const response = await friendReq_middleware.acceptFriendRequest(obj);
        console.log(response);
        if(response === "success") {
            console.log(this.props.recipient);
            this.props.removeAcceptedFriendRequest(this.props.recipient);
        }
    }

    handleReject = async (e) => {
        e.preventDefault();
        console.log("Rejecting friend now");
        // formatted from ,to
        var obj = {
            sender: this.props.recipient,
            username: this.props.sender
        }
        const response = await friendReq_middleware.rejectFriendRequest(obj);
        console.log(response);
        if(response === "success") {
            console.log(this.props.recipient);
            this.props.removeAcceptedFriendRequest(this.props.recipient);
        }
    }
    render () {
        var {recipient, key } = this.props;
        return (
            <div >
                <div style = {{display: "inline-block"}}> 
                {recipient}
                </div>
                <div style = {{display: "inline-block", marginLeft: "2px"}} onClick= {this.handleAccept}>accept</div>
                <div style = {{display: "inline-block", marginLeft: "2px"}} onClick = {this.handleReject}> reject </div>
            </div>
        )
    }
}


export default IncomingFriendRequest;