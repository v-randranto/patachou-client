import React, { useState, useContext } from 'react';
import { Redirect } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { authContext } from '../../contexts/authContext';

export default function Login({ history }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData, auth } = useContext(authContext);

  const onFormSubmit = (e) => {
    e.preventDefault();
    
    setAuthData(pseudo); // typically here we send a request to our API and in response, we receive the user token.
    //As this article is about the front-end part of authentication, we will save in the context the user's pseudo.
    history.replace('/profile'); //after saving pseudo the user will be sent to Panel;
  };

  if (auth.data) {
    return <Redirect to='/profile'/>;
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
            J'envoie la sauce caramel
          </Button>

          <Button variant="secondary mt-5" href="/register" block>
            Je n'ai pas de compte
          </Button>

          <Button variant="info my-3" href="/lost-password" block>
            J'ai perdu mon mot de passe
          </Button>
        </Form>
      </Col>
    </>
  );
}
