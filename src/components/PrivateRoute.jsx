/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN } from '../constants/paths';
import AuthService from '../components/services/authService'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    const currentUser = AuthService.currentUser;
    if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return <Redirect to={LOGIN} />
    }

    // authorised so return component
    return <Component {...props} />
}} /> 
)
export default PrivateRoute;