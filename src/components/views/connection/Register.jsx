import React, { useReducer } from 'react'
import Col from 'react-bootstrap/Col'
import AuthService from '../../../services/authService'
import RegisterForm from './RegisterForm'
import { process } from '../../../constants/actionTypes'
import processReducer from '../../../reducers/processReducer'

const Register = () => {
   const registerStatusInit = {
      isLoading: false,
      isSuccessful: false,
      hasFailed: false,
      emailHasFailed: false,
      errorCode: null,
   }
   const [registerStatus, dispatch] = useReducer(processReducer, registerStatusInit)

   const registerAccount = (values, photoFile) => {
      dispatch({ type: process.REINIT })
      const profile = { ...values }
      profile.pseudo = values.pseudo.trim()
      profile.email = values.email.trim()
      if (photoFile) {
         profile.photo = { ...photoFile }
      }

      AuthService.register(profile).then(
         (data) => {
            dispatch({ type: process.SUCCESS, emailHasFailed: !data.emailIsSent })
         },
         (error) => {
            dispatch({ type: process.FAILURE, errorCode: error.statusCode })
         },
      )
   }

   return (
      <div className="wrapper">
         <Col md="6" lg="4" className="mx-auto">
            <h3 className="text-dark text-center pt-4 pb-3 ">Je m&apos;inscris...</h3>
            <RegisterForm registerStatus={registerStatus} registerAccount={registerAccount} />
         </Col>
      </div>
   )
}

export default Register
