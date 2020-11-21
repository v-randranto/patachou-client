import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, FixLater } from '../../models/types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserNinja, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
const passwordIcon = <FontAwesomeIcon icon={faLock} />;
const pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />;
const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

type LoginProps = { history: FixLater };

const Login: React.FC<{ history: FixLater }> = ({ history }: LoginProps) => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthData, auth }: AuthContextType = useContext<FixLater>(AuthContext);

    const onFormSubmit = (e: FixLater) => {
        e.preventDefault();
        console.log(password);
        setAuthData(pseudo);
        history.replace('/profile');
    };

    if (auth.data) {
        return <Redirect to="/profile" />;
    }

    return (
        <>
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
                <Form onSubmit={onFormSubmit}>
                    <InputGroup className="mt-4" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{pseudoIcon}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name="pseudo"
                            type="text"
                            placeholder="mon pseudo"
                            onChange={(e) => {
                                setPseudo(e.target.value);
                            }}
                        />
                    </InputGroup>
                    <InputGroup className="mt-4" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{passwordIcon}</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="mon mot de passe"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </InputGroup>

                    <Button type="submit" variant="send my-5 col-4 auto" size="lg">
                        {submitIcon}
                    </Button>

                    <Button variant="link mt-5" href="/register" block>
                        Je n&apos;ai pas de compte
                    </Button>

                    <Button variant="link my-3" href="/lost-password" block>
                        J&apos;ai perdu mon mot de passe
                    </Button>
                </Form>
            </Col>
        </>
    );
};

export default Login;
