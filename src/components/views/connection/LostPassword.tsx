import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { LOGIN } from '../../../constants/paths';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FixLater } from '../../../models/types';

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;


const LostPassword: React.FC = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const onFormSubmit = (e: FixLater) => {
        e.preventDefault();
        console.log(email);
        history.replace(LOGIN)
    };

    return (
        <div className="wrapper">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Mot de passe perdu</h3>
                <p className="text-center">Je saisis mon email pour recevoir un mot de passe provisoire.</p>
                <Form onSubmit={onFormSubmit}>
                    <InputGroup className="mt-4" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text>@*</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name="email"
                            type="email"
                            maxLength={20}
                            placeholder="mon.adresse@email.com"
                            onChange={({ target }) => {
                                setEmail(target.value);
                            }}
                        />
                    </InputGroup>

                    <ButtonGroup className="mt-4 col p-0" size="lg">
                        <Button type="submit" variant="send" disabled>
                            {submitIcon} J&apos;envoie!
                        </Button>
                    </ButtonGroup>
                </Form>
            </Col>
        </div>
    );
};

export default LostPassword;
