import React, { Component} from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home'
import Header from './Header/Header'
import Login from './Auth/Login'
import Signup from './Auth/Signup'
import Feed from './Feed'
import NewsFeed from './Feed/NewsFeed';
import ChatArea from './Chat/ChatArea'
import Notifications from './Notifications/Notifications'
import { ProtectedRoute } from './Auth/ProtectedRoute';
class App extends Component {
   render () {
    return (
        <div> 
            <BrowserRouter > 
                <Header /> 
                <div className = "container"> 
                    <Route exact path = "/" component = {Home} />
                    <Route path = "/login" component = {Login} />
                    <Route path = "/signup" component = {Signup} />
                    <ProtectedRoute path ="/profile" component = {NewsFeed}/>
                    <ProtectedRoute path = "/feed" component = {Feed} />
                    <ProtectedRoute path = "/notifications" component = {Notifications} />
                </div>
                <ChatArea />
            </BrowserRouter>
        </div>
    )
   }
}

export default App;