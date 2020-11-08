import React, { useState, useContext } from 'react'
import { Redirect } from "react-router-dom"
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../contexts/AuthContext'
import { AuthContextType, FixLater } from '../../models/types'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function Login({ history }: { history: FixLater }) {
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const { setAuthData, auth} : AuthContextType = useContext<FixLater>(AuthContext)

  const onFormSubmit = (e: FixLater) => {
    e.preventDefault();
    console.log(password)
    setAuthData(pseudo);
    history.replace('/profile'); 
  };

  if (auth.data) {
    return <Redirect to='/profile'/>
  }

  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Control
              className="my-3"
              name="pseudo"
              type="text"
              placeholder="* Pseudonyme"
              onChange={(e) => {
                setPseudo(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
          <Form.Control
            className="my-3"
            name="password"
            type="password"
            placeholder="* Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          </Form.Group>
          

          <Button type="submit" variant="primary my-4" block >
            J&apos;envoie la sauce caramel
          </Button>

          <Button variant="secondary mt-5" href="/register" block>
            Je n&apos;ai pas de compte
          </Button>

          <Button variant="info my-3" href="/lost-password" block>
            J&aposai perdu mon mot de passe
          </Button>
        </Form>
      </Col>
    </>
  )
}
