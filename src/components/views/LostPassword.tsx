import React, {useContext} from 'react'
import { Redirect } from "react-router-dom"
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { IAuth } from '../../models/auth'
import { FixLater } from '../../models/types'
import { PROFILE } from '../../constants/paths'

const LostPassword: React.FC = () => {
  
  const { auth }: {auth:IAuth} = useContext<FixLater>(AuthContext)
  if (auth.data) {
    return <Redirect to={PROFILE} />
  }

  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-dark text-center pt-4 pb-3 ">
          J&apos;ai perdu mon mot de passe...
        </h3>
        <p className="text-center">
          Saisissez votre email pour recevoir un mot de passe provisoire.
        </p>
        <Form>
          <Form.Control
            className="my-3"
            name="email"
            type="text"
            placeholder="* adresse@email.com"
          />

          <Button className="my-4" variant="primary" block>
            J&apos;envoie la sauce caramel
          </Button>
        </Form>
      </Col>
    </>
  )
}

export default LostPassword