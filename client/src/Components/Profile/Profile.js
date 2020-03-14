import React, { Component } from 'react';
import UpdateProfile from './UpdateProfile';
import DisplayProfile from './DisplayProfile';
import profile_middleware from './../../Middleware/Profile';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {}
        }
    }
    async componentDidMount() {
        var obj = {username: this.props.username};
        var userInfo = await profile_middleware.getAllUserInfo(obj);
        userInfo = userInfo.data;
        //console.log(userInfo);
        this.setState({profileData: userInfo});
    }
    updateProfile = (response) => {
        console.log(response);
        this.setState({profileData : response.data});
    }
    renderProfile = () => {
        return (
            <DisplayProfile currentUser = {this.props.username} profileInfo = {this.state.profileData}/>
        );
    }
    render () {
        return (
            <div>
                <UpdateProfile currentUser={this.props.username} updateProfile = {this.updateProfile}/>
                {this.renderProfile()}
            </div>
        )
    }
}

export default Profile;