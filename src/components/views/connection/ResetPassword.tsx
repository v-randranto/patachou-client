import React, { useState, useRef, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import BsSpinner from '../../layout/Spinner';
import Notification from '../../modals/Notification';
import ErrorNotification from '../../modals/ErrorNotification';
import paths from '../../../constants/paths.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FixLater } from '../../../models/types';
import { useFormik } from 'formik';
import AuthService from '../../../services/authService';
import { validate } from '../../../validators/resetPasswordForm';
import { RESET_PASSWORD, ERROR_NOTE } from '../../../constants/modalConfig';

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />,
    passwordIcon = <FontAwesomeIcon icon={faLock} />;

const ResetPassword: React.FC = () => {
    const resetStateInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: 0,
    };
    const [resetState, setResetState] = useState<FixLater>(resetStateInit);

    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            resetPassword(values);
        },
    });
    const history = useHistory();
    const passwordRef = useRef<HTMLInputElement>(null);
    const { resetToken } = useParams<{ resetToken: string }>();

    useEffect(() => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    }, []);

    const onCloseNotificationModal = () => {
        history.push(paths.HOME);
        window.location.reload();
    };

    const resetPassword = (values) => {
        const { password } = values;
        setResetState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        AuthService.resetPassword(password, resetToken).then(
            () => {
                setResetState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isSuccessful: true,
                }));
            },
            () => {
                setResetState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    hasFailed: true
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
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            maxLength={10}
                            placeholder="mon mot de passe"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputGroup>
                    <small>De 8 à 15 caractères dont 1 maj, 1 min et 1 chiffre</small>
                    {formik.errors.password && formik.touched.password && (
                        <Alert variant="danger py-0">{formik.errors.password}</Alert>
                    )}
                    <InputGroup className="mt-2" size="lg">
                        <InputGroup.Prepend>
                            <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            maxLength={10}
                            placeholder="je confirme"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </InputGroup>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                        <Alert variant="danger py-0 mt-1">{formik.errors.confirmPassword}</Alert>
                    )}

                    {!resetState.loading && (
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
                    {resetState.loading && <BsSpinner />}
                </Form>

                {resetState.isSuccessful && <Notification config={RESET_PASSWORD} onClose={onCloseNotificationModal} />}
                {resetState.hasFailed && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default ResetPassword;
