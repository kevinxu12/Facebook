import React, { Component } from 'react'

class OutgoingFriendRequest extends Component {

    render () {
        return <div>
            Pending request to { this.props.recipient}
        </div>
    }
}

export default OutgoingFriendRequest;