import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'; 
import auth from './../../Middleware/Auth'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errorUser: '',
            password: '',
            errorPass: ''
        }
    }
    // handle change in input for username
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    //handle change in input for password 
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    // check if a login attempt is valid, display errors otherwise
    validLoginAttempt = () => {
        if(!this.state.errorPass && !this.state.errorUser) {
            console.log("triggered login sequence");
            var obj = {username: this.state.username, password: this.state.password};
            auth.login(obj, (result) => {
                if(result === "success") {
                    this.props.history.push({
                        pathname: '/feed',
                        state: {username: this.state.username}
                    });
                } else {
                    this.setState({errorUser: result});
                }
            })
        }
    }

    // handle when someone presses submit
    handleSubmit = (event) => {
        event.preventDefault();
        var errorUser = '';
        var errorPass = '';
        if(!this.state.username) {
            errorUser = "Blank username error"
        } 
        if(!this.state.password) {
            errorPass = "Blank password error"
        }
        this.setState({errorUser: errorUser, errorPass: errorPass}, () => {
            this.validLoginAttempt();
        });
    }

    // render
    render () {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div><label> Username </label><input value = {this.state.username} onChange = {this.handleUsernameChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorUser}</div> </div>
                    <div><label> Password </label><input id = "password" type = "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorPass}</div>
                    </div>
                    
                    <Link to= "/" className = "blue btn-flat left white-text">
                            cancel
                    </Link>
                    <button type = "submit" className = "blue btn-flat right white-text"> 
                        Submit 
                        <i className="material-icons right"> done </i>
                    </button>
                </form>
            </div> 
        )
    }
}

export default withRouter(Login);