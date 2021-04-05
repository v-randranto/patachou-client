import React from 'react'

import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FORMAT_RULES } from '../../../constants/formRules'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faUserNinja } from '@fortawesome/free-solid-svg-icons'

const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',')
const photoIcon = <FontAwesomeIcon icon={faCamera} />,
   pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />

const RegisterProfileStep = ({ formik, setPhotoFile, photoFile }) => {
   const readFile = (file) => {
      if (file) {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => {
            const photo = {
               name: file.name,
               contentType: file.type,
               content: reader.result,
            }
            setPhotoFile(photo)
         }
      }
   }

   const resetPhotoInput = () => {
      setPhotoFile(null)
   }
   return (
      <>
         <InputGroup className="mt-4" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>{pseudoIcon}*</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
               type="text"
               name="pseudo"
               id="pseudo"
               maxLength={20}
               placeholder="mon pseudonyme"
               value={formik.values.pseudo}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
         </InputGroup>
         <small>De longueur 20 max. et sans caractères spéciaux</small>
         {formik.errors.pseudo && formik.touched.pseudo && <Alert variant="danger py-0">{formik.errors.pseudo}</Alert>}

         <Form.Group className="mt-2">
            <Form.Control
               size="lg"
               as="textarea"
               name="presentation"
               id="presentation"
               placeholder="mon 'ti pitch de présentation..."
               rows={3}
               cols={30}
               maxLength={120}
               value={formik.values.presentation}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
            />
            <small>{120 - formik.values.presentation.length} caractères disponibles </small>
         </Form.Group>

         <InputGroup className="mt-2" size="lg">
            <InputGroup.Prepend>
               <InputGroup.Text>{photoIcon}</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Label className="form-control">
               <span className="text-secondary">{photoFile ? photoFile.name : 'Je charge ma photo'}</span>
               <Form.File
                  className="form-control d-none"
                  accept={acceptFileExtensions}
                  onChange={(e) => {
                     if (e.target && e.target.files) {
                        readFile(e.target.files[0])
                     }
                  }}
                  onBlur={formik.handleBlur}
               />
            </Form.Label>
            <small>Fichier de 500ko max. et d&apos;extension jpg, jpeg, png ou gif</small>
         </InputGroup>
         <span onClick={resetPhotoInput}>X</span>
         {formik.errors.photo && <Alert variant="danger py-0">{formik.errors.photo}</Alert>}
      </>
   )
}

export default RegisterProfileStep
