import Dropdown from 'react-dropdown';
import React, { Component } from 'react';
import 'react-dropdown/style.css';
import profile_middleware from './../../Middleware/Profile';
import notification_middleware from './../../Middleware/Notifications';
const options = [
    {value: 'email', label: 'Email'},
    {value: 'birthday', label: 'Birthday'},
    {value: 'interest', label: 'Interests'},
    {value: 'status', label: 'Status'},
    {value: 'firstname', label: 'First Name'},
    {value: 'lastname', label: 'Last Name'}
];

class UpdateProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            changeAttribute: '',
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onSelect = (event) => {
        this.setState({changeAttribute: event.value});
    }

    handleValueChange = (event) => {
        this.setState({value: event.target.value});
    }

    async handleSubmit (event) {
        event.preventDefault();
        console.log("Submitted profile update");
        var username = localStorage.getItem("token");
        var timeOfPost = new Date().toUTCString();
        var obj = {
            username: username,
            field: this.state.changeAttribute,
            value: this.state.value
        }
        var res = await profile_middleware.updateProfile(obj);
        var notification = {
            username: username,
            date: timeOfPost,
            notification: username + " updated " + this.state.changeAttribute + " at " + timeOfPost
        }
        console.log(notification);
        await notification_middleware.addNewNotification(notification);
        this.props.updateProfile(res);
    }
    render () {
        return (
            <div>
                <Dropdown options={options} onChange={this.onSelect} value={this.state.changeAttribute} placeholder="Select an option" />
                <form onSubmit = {this.handleSubmit}>
                        <div><label> Update Value {this.state.changeAttribute} </label><input value = {this.state.newValue} onChange = {this.handleValueChange}/></div>
                        <button type = "submit" className = "blue btn-flat right white-text"> 
                            Update
                            <i className="material-icons right"> done </i>
                        </button>
                </form>
            </div>
        )
    }
}
export default UpdateProfile;