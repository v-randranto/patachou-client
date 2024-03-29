/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import paths from '../constants/paths.json'
import { useAuth } from '../contexts/AuthContext.js'

const PrivateRoute = ({ component: Component, ...rest }) => {
   const { currentUser } = useAuth()
   return (
      <Route
         {...rest}
         render={(props) => {
            if (!currentUser) {
               // not logged in so redirect to login page with the return url
               return <Redirect to={paths.LOGIN} />
            }

            // authorised so return component
            return <Component {...props} />
         }}
      />
   )
}
export default PrivateRoute
