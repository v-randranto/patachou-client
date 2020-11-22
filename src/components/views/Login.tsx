import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, FixLater } from '../../models/types';
import { Account, IProfile } from '../../models/account';
import { ACTION_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../../constants/events';
import { CONNECTION_ACTIONS } from '../../constants/actionTypes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserNinja, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const passwordIcon = <FontAwesomeIcon icon={faLock} />;
const pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />;
const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

type LoginProps = { history: FixLater };

const Login: React.FC<{ history: FixLater }> = ({ history }: LoginProps) => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);
    const { setAuthData, auth }: AuthContextType = useContext<FixLater>(AuthContext);

    const onFormSubmit = (e: FixLater) => {
        e.preventDefault();

        const profile: IProfile = { pseudo, password };

        const account = new Account(profile);
        account.emit(ACTION_ACCOUNT, CONNECTION_ACTIONS.login);
        account.on(ACTION_DONE, () => {
            setSuccess(true);
            setAuthData(pseudo);
            history.replace('/profile');
        });
        account.on(ACTION_FAILED, () => {
            setFailure(true);
        });
        if (success) {
            console.log(success)
        }
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
                            maxLength={20}
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
                            maxLength={30}
                            placeholder="mon mot de passe"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </InputGroup>

                    <ButtonGroup className="mt-4 col p-0" size="lg">
                        <Button type="submit" variant="send">
                            {submitIcon} J&apos;envoie!
                        </Button>
                    </ButtonGroup>

                    {failure && <Alert variant="danger py-0">Pseudo ou mot de passe incorrects</Alert>}

                    <Button variant="secondary mt-5 col" href="/register">
                        Je n&apos;ai pas de compte
                    </Button>

                    <Button variant="info my-3" href="/lost-password" block>
                        J&apos;ai perdu mon mot de passe
                    </Button>
                </Form>
            </Col>
        </>
    );
};

export default Login;
