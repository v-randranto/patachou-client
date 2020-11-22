/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { LOGIN } from '../constants/paths';
import { AuthContext } from '../contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);
    const { loading } = auth
  
    if (loading) {
      return (
        <Route
          {...rest}
          render={() => {
            return <p>Loading...</p>
          }}
        />
      )
    }
  // if loading is set to true (when our function useEffect(() => {}, []) is not executed), we are rendering a loading component;
  
    return (
      <Route
        {...rest}
        render={routeProps => {
          return auth.data ? (
            <Component {...routeProps} />
          ) : (
            <Redirect to={LOGIN} />
          )
        }}
      />
    )
  }

  export default PrivateRoute