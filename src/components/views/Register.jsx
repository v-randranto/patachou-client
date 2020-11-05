import React, {useContext} from 'react';
import { Redirect } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { authContext } from '../../contexts/authContext';

export default function Register() {
  const { auth } = useContext(authContext);
  if (auth.data) {
    return <Redirect to='/profile'/>;
  }

  return (
    <>
      <Col md="6" lg="4" className="mx-auto">
        <h3 className="text-dark text-center pt-4 pb-3 ">Je m'inscris...</h3>

        <Form>
          <Form.Group className="my-3">
            <Form.Control
              name="pseudo"
              type="text"
              placeholder="* Pseudonyme"
              required
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="* Mot de passe"
              required
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Control
              name="password"
              type="password"
              placeholder="* Confirmation mot de passe"
              required
            />
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Control
              name="password"
              type="email"
              placeholder="* adresse@email.com"
              required
            />
            <Form.Text className="text-muted">
              Nous ne partagerons pas votre email.
            </Form.Text>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Control
              name="message"
              as="textarea"
              rows={2}
              cols={50}
              placeholder="* Votre présentation... (140 caractères)"
            />
          </Form.Group>

          <Button className="my-4" variant="primary" block>
            J'envoie la sauce caramel
          </Button>

          <Button variant="info" href="/login" block>
            J'ai déjà un compte
          </Button>
        </Form>
      </Col>
    </>
  );
}
