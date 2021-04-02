/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import BsSpinner from '../../layout/Spinner';
import Notification from '../../modals/Notification';
import ErrorNotification from '../../modals/ErrorNotification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { validate } from '../../../validators/lostPasswordForm';
import { LOST_PASSWORD, ERROR_NOTE } from '../../../constants/modalConfig';

const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />,
    passwordIcon = <FontAwesomeIcon icon={faLock} />;

const LostPasswordForm: React.FC = ({sendPasswordLink, lostStatus}) => {

    const initialValues = {
        email: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            sendPasswordLink(values);
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
    };

    return (
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
            {lostStatus.isSuccessful && <Notification config={LOST_PASSWORD} onClose={onCloseNotificationModal} />}
            {lostStatus.loading && <BsSpinner />}
            {lostStatus.hasFailed && lostStatus.errorCode === 404 && (
                <Alert variant="danger py-0 mt-2">Mon email est inconnue</Alert>
                )}
            {lostStatus.hasFailed && lostStatus.errorCode !== 404 && <ErrorNotification config={ERROR_NOTE}/>}
        </Form>              
    );
};

export default LostPasswordForm;
