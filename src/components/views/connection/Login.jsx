import React, { useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import Col from 'react-bootstrap/Col'

import paths from '../../../constants/paths.json'
import LoginForm from './LoginForm'
import AuthService from '../../../services/authService'
import { useAuth } from '../../../contexts/AuthContext'
import { process, connection } from '../../../constants/actionTypes'
import processReducer from '../../../reducers/processReducer'

const Login = () => {
   const history = useHistory()
   const { currentUser, userDispatch } = useAuth()
   if (currentUser.isAuthenticated) {
      history.replace(paths.HOME)
   }
   const loginStatusInit = {
      isLoading: false,
      isSuccessful: false,
      hasFailed: false,
      errorCode: null,
   }
   const [loginStatus, loginStatusDispatch] = useReducer(processReducer, loginStatusInit)

   const loginSubmit = (values) => {
      loginStatusDispatch({ type: process.REINIT })
      const { pseudo, password } = values
      const identification = { pseudo, password }
      identification.pseudo = values.pseudo.trim()

      AuthService.login(identification).then(
         (user) => {
            loginStatusDispatch({ type: process.SUCCESS })
            userDispatch({ type: connection.LOGIN, user })
            history.replace(paths.PROFILE)
         },
         (error) => {
            loginStatusDispatch({ type: process.FAILURE, errorCode: error.statusCode })
         },
      )
   }

   return (
      <div className="wrapper">
         <Col md="6" lg="4" className="mx-auto">
            <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
            <LoginForm loginSubmit={loginSubmit} loginStatus={loginStatus} />
         </Col>
      </div>
   )
}

export default Login
