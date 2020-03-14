import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const spanStyle = {
    'height': '8px', 
    'width': '8px',
    'background-color': 'green', 
    'border-radius': '50%',
    'display': 'inline-block',
    'margin-right': '10px'
}


class Chat extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("We clicked chat");
        // const name = [this.props.username, this.props.chatRecipient].sort().join(', ');
        this.props.addChat(this.props.username, [this.props.username, this.props.chatRecipient]);
    }
    render() {
        var { chatRecipient, key } = this.props;
        return (
            <div>
                <div key={key} onClick={this.handleSubmit}>
                    <span class="dot" style={spanStyle}></span>
                    {chatRecipient}
                </div>
            </div>
        )
    }
}


export default connect(null, actions)(Chat);