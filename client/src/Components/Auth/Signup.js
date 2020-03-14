import React, { Component } from 'react'
import { Link } from 'react-router-dom'; 
import auth from './../../Middleware/Auth';
import "./Signup.css"
class Signup extends Component {

    // keep track of variables for each attribute as well as error attributes 
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            errorUser: '',
            password: '',
            errorPass: '',
            email: '',
            errorEmail: '',
            affiliation: 'none',
            birthday: 'none',
            firstname: '',
            lastname: '',
            interests: ''
        }
    }

    // below are a bunch of handlers to deal with the inputs
    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleBirthdayChange = (event) => {
        this.setState({
            birthday: event.target.value
        })
    }
    handleAffiliationChange = (event) => {
        this.setState({
            affiliation: event.target.value
        })
    }
    handleInterestChange = (event) => {
        this.setState({
            interests: event.target.value
        })
    }
    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleFirstNameChange = (event) => {
        this.setState({
            firstname: event.target.value
        })
    }
    handleLastNameChange = (event) => {
        this.setState({
            lastname: event.target.value
        })
    }

    // check if something is a valid signup attempt, if so lets make a request to the backend.
    validSignupAttempt = () => {
        if(!this.state.errorPass && !this.state.errorUser && !this.state.errorEmail) {
            console.log("triggered signup sequence");
            var obj = {username: this.state.username, password: this.state.password, email: this.state.email,
                affiliation: this.state.affiliation, birthday: this.state.birthday, firstname: this.state.firstname, 
                lastname: this.state.lastname, interests: this.state.interests
            };
            var obj2 = {username: this.state.username, friendUsername: this.state.username};
            auth.signup(obj, obj2, (result) => {
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
    handleSubmit = (event) => {
        event.preventDefault();
        var errorUser = '';
        var errorPass = '';
        var errorEmail = '';
        if(!this.state.username) {
          errorUser = "blank username error";
        }
        if(!this.state.email) {
           errorEmail = 'blank email error';
        }
        if(!this.state.password) {
           errorPass = "blank password error"
        }
        this.setState({errorUser: errorUser, errorPass: errorPass, errorEmail: errorEmail}, () => {
            this.validSignupAttempt();
        });
        
    }
    // fix signup css
    // Ideally, would love to refactor this but for now, time does not permit.
    render () {
        return (
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <div><label className = "required"> Username </label><input value = {this.state.username} onChange = {this.handleUsernameChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorUser}</div> </div>
                    <div><label className = "required"> Password </label><input label = "password" type = "password" value = {this.state.password} onChange = {this.handlePasswordChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorPass}</div>
                    </div>
                    <div><label className = "required"> Email </label><input value = {this.state.email} onChange = {this.handleEmailChange}/>
                    <div className = "red-text" style = {{ marginBottom : '20px'}}>{this.state.errorEmail}</div>
                    </div> 
                    <div className = "row"><input id = "name" type = "text" length = "40" value = {this.state.affiliation} onChange = {this.handleAffiliationChange}/><label>Affiliation</label></div>  
                    <div className = "row"><input id = "name" type = "text" length = "40" value = {this.state.birthday} onChange = {this.handleBirthdayChange}/><label>Birthday</label></div>         
                    <div className = "row"><input id = "name" type = "text" length = "40" value = {this.state.firstname} onChange = {this.handleFirstNameChange} /><label>First Name</label></div>   
                    <div className = "row"><input id = "name" type = "text" length = "40" value = {this.state.lastname} onChange = {this.handleLastNameChange} /><label>Last Name</label></div>   
                    <div className = "row"><input id = "name" type = "text" length = "10" value = {this.state.interests} onChange = {this.handleInterestChange}/><label>Enter Interests</label></div>          
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

export default Signup;