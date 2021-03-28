import React, { useState, useRef, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import BsSpinner from '../../layout/Spinner';
import Notification from '../../modals/Notification';
import ErrorNotification from '../../modals/ErrorNotification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FixLater } from '../../../models/types';
import { useFormik } from 'formik';
import AuthService from '../../../services/authService';
import { validate } from '../../../validators/lostPasswordForm';
import { LOST_PASSWORD, ERROR_NOTE } from '../../../constants/modalConfig';

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />,
    passwordIcon = <FontAwesomeIcon icon={faLock} />;

const PasswordPassword: React.FC = () => {
    const lostStateInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: null
    };
    const [lostState, setLostState] = useState<FixLater>(lostStateInit);

    const initialValues = {
        email: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            sendResetLink(values);
        },
    });
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (emailRef && emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const onCloseNotificationModal = () => {
        formik.resetForm();
        setLostState(lostStateInit);
    };

    const sendResetLink = (values) => {
        const { email } = values;
        setLostState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        AuthService.lostPassword(email).then(
            () => {
                setLostState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isSuccessful: true,
                }));
            },
            (error) => {
                setLostState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    hasFailed: true,
                    errorCode: error.statusCode
                }));
            },
        );
    };

    return (
        <div className="wrapper">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Réinitialisation mot de passe</h3>
                <Form onSubmit={formik.handleSubmit} noValidate>
                    <InputGroup className="mt-4" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="mon email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputGroup>

                    {formik.errors.email && formik.touched.email && (
                        <Alert variant="danger py-0">{formik.errors.email}</Alert>
                    )}

                    {!lostState.loading && (
                        <Button
                            className="mt-4 col p-0"
                            size="lg"
                            type="submit"
                            variant="send"
                            disabled={!formik.isValid}
                        >
                            {submitIcon} J&apos;envoie!
                        </Button>
                    )}
                    {lostState.loading && <BsSpinner />}
                </Form>
                {lostState.isSuccessful && <Notification config={LOST_PASSWORD} onClose={onCloseNotificationModal} />}
                {lostState.hasFailed && lostState.errorCode === 404 && (
                    <Alert variant="danger py-0 mt-2">Mon email est inconnue</Alert>
                )}{' '}
                {lostState.hasFailed && lostState.errorCode !== 404 && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default PasswordPassword;
