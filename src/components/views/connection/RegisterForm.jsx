import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useFormik } from 'formik'

import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Form from 'react-bootstrap/Form'

import RegisterAuthStep from './RegisterAuthStep'
import RegisterProfileStep from './RegisterProfileStep'

import BsSpinner from '../../layout/Spinner'
import Notification from '../../modals/Notification'
import ErrorNotification from '../../modals/ErrorNotification'
import { validate } from '../../../validators/registerForm'
import registrationSchema from '../../../validators/registrationSchema'

import paths from '../../../constants/paths.json'
import { REGISTER, ERROR_NOTE } from '../../../constants/modalConfig'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faAngleDoubleLeft, faAngleDoubleRight, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons'

const nextIcon = <FontAwesomeIcon icon={faAngleDoubleRight} />,
   previousIcon = <FontAwesomeIcon icon={faAngleDoubleLeft} />,
   resetIcon = <FontAwesomeIcon icon={faTimes} />,
   submitIcon = <FontAwesomeIcon icon={faPaperPlane} />

const RegisterForm = ({ registerStatus, registerAccount }) => {
   const [stepState, setStepState] = useState(1)
   const [photoFile, setPhotoFile] = useState()

   const initialValues = {
      pseudo: '',
      presentation: '',
      email: '',
      password: '',
      confirmPassword: '',
   }

   const formik = useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: (values) => {
         registerAccount(values, photoFile)
      },
   })

   const history = useHistory()

   const onCloseNotificationModal = () => {
      history.push(paths.LOGIN)
      window.location.reload()
   }

   const resetStep = (...props) => {
      props.forEach((prop) => {
         formik.setFieldValue(prop, '')
         formik.setFieldTouched(prop, false)
      })
   }

   return (
      <Form onSubmit={formik.handleSubmit} noValidate>
         {stepState === 1 && (
            <div>
               <RegisterAuthStep formik={formik} />

               <ButtonGroup className="mt-4 col p-0" size="lg">
                  <Button
                     variant="secondary offset-6 col-3"
                     onClick={() => {
                        resetStep('email', 'password', 'confirmPassword')
                     }}
                  >
                     {resetIcon}
                  </Button>

                  <Button variant="info col-3" onClick={() => setStepState(2)} >
                     {nextIcon}
                  </Button>
               </ButtonGroup>
            </div>
         )}

         {stepState === 2 && (
            <div>
               <RegisterProfileStep formik={formik} setPhotoFile={setPhotoFile} photoFile={photoFile} />
               {!registerStatus.loading && (
                  <ButtonGroup className="mt-4 col p-0" size="lg">
                     <Button variant="info p-0 col-3" onClick={() => setStepState(1)}>
                        {previousIcon}
                     </Button>
                     <Button type="submit" variant="send" disabled={!formik.isValid}>
                        {submitIcon} J&apos;envoie!
                     </Button>
                     <Button variant="secondary p-0 col-3" onClick={() => resetStep('pseudo', 'presentation', 'photo')}>
                        {resetIcon}
                     </Button>
                  </ButtonGroup>
               )}
            </div>
         )}

         {registerStatus.loading && <BsSpinner />}

         <Button as={Link} variant="gotolink mt-5 p-1" to={paths.LOGIN} block>
            J&apos;ai déjà un compte
         </Button>
         {registerStatus.isSuccessful && (
            <Notification
               config={REGISTER}
               emailHasFailed={registerStatus.emailHasFailed}
               onClose={onCloseNotificationModal}
            />
         )}
         {registerStatus.hasFailed && <ErrorNotification config={ERROR_NOTE} />}
      </Form>
   )
}

export default RegisterForm
