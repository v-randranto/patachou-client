import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authContext } from '../../contexts/authContext';

export default function LostPassword() {
  const { auth } = useContext(authContext);
  if (auth.data) {
    return <Redirect to='/profile'/>;
  }

  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-dark text-center pt-4 pb-3 ">
          J'ai perdu mon mot de passe...
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
            J'envoie la sauce caramel
          </Button>
        </Form>
      </Col>
    </>
  );
}
