import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import auth from './../../Middleware/Auth'
// a protected route will reroute back to the root if your username is not locally stored.
export const ProtectedRoute = ({ component: Component, ... rest}) => {
    return (
        <Route
         {...rest }
         render = {props => {
             if(localStorage.getItem("token")) {
                 return <Component {...props} />
             } else {
                 return <Redirect to= "/" />
             }
         }}
        />
    )
}