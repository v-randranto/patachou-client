import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { LOGIN } from '../../constants/paths';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FixLater } from '../../models/types';

const pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />;
const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

type LostProps = { history: FixLater };

const LostPassword: React.FC<{ history: FixLater }> = ({ history }: LostProps) => {
    const [pseudo, setPseudo] = useState('');
    const onFormSubmit = (e: FixLater) => {
        e.preventDefault();
        console.log(pseudo);
        history.replace(LOGIN)
    };

    return (
        <div className="home">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Mot de passe perdu</h3>
                <p className="text-center">Je saisis mon pseudo pour recevoir un mot de passe provisoire.</p>
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
                            onChange={({ target }) => {
                                setPseudo(target.value);
                            }}
                        />
                    </InputGroup>

                    <ButtonGroup className="mt-4 col p-0" size="lg">
                        <Button type="submit" variant="send">
                            {submitIcon} J&apos;envoie!
                        </Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </div>
    );
};

export default LostPassword;
