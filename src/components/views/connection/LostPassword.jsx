import React, { useRef, useEffect, useReducer } from 'react';

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
import { useFormik } from 'formik';
import AuthService from '../../../services/authService';
import { validate } from '../../../validators/lostPasswordForm';
import { LOST_PASSWORD, ERROR_NOTE } from '../../../constants/modalConfig';
import {process} from "../../../constants/actionTypes"
import processReducer from "../../../reducers/processReducer"

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />,
    passwordIcon = <FontAwesomeIcon icon={faLock} />;

const PasswordPassword: React.FC = () => {
    const lostStatusInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: null
    };
    const [lostStatus, dispatch] = useReducer(processReducer, lostStatusInit)

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
    const emailRef = useRef(null);

    useEffect(() => {
        if (emailRef && emailRef.current) {
            emailRef.current.focus();
        }
    }, []);

    const onCloseNotificationModal = () => {
        formik.resetForm();
        setLostState(lostStatusInit);
    };

    const sendResetLink = (values) => {
        const { email } = values;
        dispatch({type: process.REINIT})
        AuthService.lostPassword(email).then(
            () => {
                dispatch({type: process.SUCCESS})
            },
            (error) => {
                dispatch({type: process.FAILURE, errorCode: error.statusCode})
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

                    {!lostStatus.loading && (
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
                    {lostStatus.loading && <BsSpinner />}
                </Form>
                {lostStatus.isSuccessful && <Notification config={LOST_PASSWORD} onClose={onCloseNotificationModal} />}
                {lostStatus.hasFailed && lostStatus.errorCode === 404 && (
                    <Alert variant="danger py-0 mt-2">Mon email est inconnue</Alert>
                )}{' '}
                {lostStatus.hasFailed && lostStatus.errorCode !== 404 && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default PasswordPassword;
