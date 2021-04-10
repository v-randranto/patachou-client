/* eslint-disable react/prop-types */
import React, { useRef } from 'react'

import { useHistory } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import BsSpinner from '../../layout/Spinner'
import Notification from '../../modals/Notification'
import ErrorNotification from '../../modals/ErrorNotification'
import paths from '../../../constants/paths.json'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import resetPasswordSchema from '../../../validators/resetPasswordSchema'
import { RESET_PASSWORD, ERROR_NOTE } from '../../../constants/modalConfig'

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />,
   passwordIcon = <FontAwesomeIcon icon={faLock} />

const ResetPasswordForm = ({ resetPassword, resetStatus }) => {
   const initialValues = {
      password: '',
      confirmPassword: '',
   }

   const formik = useFormik({
      initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: (values) => {
         resetPassword(values)
      },
   })
   const history = useHistory()
   const passwordRef = useRef(null)

   // useEffect(() => {
      // if (passwordRef && passwordRef.current) {
         // passwordRef.current.focus()
      // }
   // }, [])

   const onCloseNotificationModal = () => {
      history.push(paths.LOGIN)
      window.location.reload()
   }

   return (
      <Form onSubmit={formik.handleSubmit} noValidate>
         <InputGroup className="mt-4" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
               ref={passwordRef}
               type="password"
               name="password"
               id="password"
               maxLength={10}
               placeholder="mon mot de passe"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
         </InputGroup>
         <small>De 8 à 15 caractères dont 1 maj, 1 min et 1 chiffre</small>
         {formik.errors.password && formik.touched.password && (
            <Alert variant="danger py-0">{formik.errors.password}</Alert>
         )}
         <InputGroup className="mt-2" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
               type="password"
               name="confirmPassword"
               id="confirmPassword"
               maxLength={10}
               placeholder="je confirme"
               value={formik.values.confirmPassword}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
         </InputGroup>
         {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <Alert variant="danger py-0 mt-1">{formik.errors.confirmPassword}</Alert>
         )}
         {!resetStatus.loading && (
            <Button className="mt-4 col p-0" size="lg" type="submit" variant="send" disabled={!formik.isValid}>
               {submitIcon} J&apos;envoie!
            </Button>
         )}
         {resetStatus.loading && <BsSpinner />}
         {resetStatus.isSuccessful && <Notification config={RESET_PASSWORD} onClose={onCloseNotificationModal} />}
         {resetStatus.hasFailed && <ErrorNotification config={ERROR_NOTE} />}
      </Form>
   )
}

export default ResetPasswordForm
