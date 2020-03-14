import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import auth from '../../Middleware/Auth';
import Search from './Search';
import { connect } from 'react-redux';
import * as actions from '../../actions';
class Header extends Component {

    handleLogout = (event) => {
        event.preventDefault();
        var obj = {
            username: this.props.user
        }
        auth.logout(obj, () => {
            console.log("Logging out");
            this.props.fetchUser();
            this.props.history.push("/");
        })
    }

    handleNotifications = (event) => {
        event.preventDefault();
        this.props.history.push("/notifications");
    }

    handleBackToFeed = (event) => {
        event.preventDefault();
        this.props.history.push("/feed");
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    // we have a bunch of conditional logic where based off your path and whether you are logged in,
    // the header will show dynamic content.
    renderContent() {
        // lets just store login in windows lmao
        var path = "/"
        if (this.props.location) {
            path = this.props.location.pathname;
        }
        if(this.props.user) {
            if(path == "/feed") {
                return ([
                    <li key = "-1"><a href={"http://localhost:8080/friendvisualizer"}> TEST VISUALIZER LINK </a></li>,
                    <li key = "0"><div style = {{marginRight: "20px"}} onClick = {this.handleNotifications}>Notifications</div> </li>,
                    <li key = "1"><div style = {{marginRight: "20px"}} onClick = {this.handleLogout}>Log out </div> </li>
                ])
            } else if (path == "/notifications") {
                return ([
                    <li key = "0"><div style = {{marginRight: "20px"}} onClick = {this.handleBackToFeed}>Back To Feed</div> </li>,
                    <li key = "1"><div style = {{marginRight: "20px"}} onClick = {this.handleLogout}>Log out </div> </li>
                ])
            }
        } else {
            if(path === "/login") {
                return ([
                    <li key = "1"><a href = '/signup'>Sign up </a> </li>,
                    <li key = "2"><a href = "/"> Back</a></li>
                ])
            } else if (path ==="/signup" ) {
                return ([
                    <li key = "1"><a href = '/login'>Login </a> </li>,
                    <li key = "2" ><a href = "/"> Back</a></li>
                ])
            } else {
                return ([
                    <li key = "1"><a href = '/login'>Login </a></li>,
                    <li key = "2"><a href = '/signup'>Sign up </a> </li>
                ]
                );
            }
        }
                
    }
    renderSearch() {
        if(this.props.user) {
            return <Search username = {this.props.user}/>
        }
    }
    render () {
        return (
            <nav>
                <div className = "blue nav-wrapper"> 
                    <ul className = "right"> 
                        {this.renderContent()}
                    </ul>
                    <ul className = "left">
                        {this.renderSearch()}
                    </ul>
                </div>
            </nav>
            
        )
    }
}
function mapStateToProps(state) {
    return { user: state.auth};
}
export default connect(mapStateToProps, actions)(withRouter(Header));