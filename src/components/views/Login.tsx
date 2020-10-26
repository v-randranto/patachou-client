import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function Login() {
  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
      <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
        <Form> 
              <Form.Control className="my-3" name="pseudo" type="text" placeholder="* Pseudonyme" />
              <Form.Control className="my-3" name="password" type="password" placeholder="* Password" />
                     
              <Button className="my-4" variant="primary" block>
              J'envoie la sauce caramel
              </Button>
               
              <Button className="mt-5" variant="secondary" href="/register" block>
                Je n'ai pas de compte
              </Button>
   
              <Button className="my-3" variant="info" href="/lost-password" block>
                J'ai perdu mon mot de passe
              </Button>     
        
        </Form>
      </Col>
    </>
  );
}
