import Alert from 'react-bootstrap/Alert'
import React from 'react'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'

const passwordIcon = <FontAwesomeIcon icon={faLock} />

const RegisterAuthStep = ({formik}) => {
   return (
      <>
         <InputGroup className="mt-4" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>@*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
               type="email"
               name="email"
               id="email"
               placeholder="mon.adresse@email.com"
               maxLength={50}
               value={formik.values.email}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
         </InputGroup>
         {formik.errors.email && formik.touched.email && (
            <Alert variant="danger py-0 mt-1">{formik.errors.email}</Alert>
         )}

         <InputGroup className="mt-4" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
               type="password"
               name="password"
               id="password"
               minLength={4}
               maxLength={10}
               placeholder="mon mot de passe"
               value={formik.values.password}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
         </InputGroup>
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
      </>
   )
}

export default RegisterAuthStep
