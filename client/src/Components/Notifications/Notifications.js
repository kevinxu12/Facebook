import React, { Component } from 'react'
import notifications_middleware from './../../Middleware/Notifications';
class Notifications extends Component {
    state = {
        notifications: []
    }
    async componentDidMount() {
        // temp hacky
        var username = localStorage.getItem("token");
        var obj = {
            username: username
        }
        var notifications = await notifications_middleware.getAllNotifications(obj);
        console.log(notifications);
        this.setState({notifications: notifications});
    }
    renderContent() {
        return this.state.notifications.map((notification) => {
            var info = notification.notification;
            return <div>{info}</div> 
        });
    }
    render() {
        return (
            <div> 
                {this.renderContent()}
            </div>
        )
    }
}

export default Notifications;