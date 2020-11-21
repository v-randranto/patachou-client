/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useState, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLock,
    faUserNinja,
    faPaperPlane,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCamera,
} from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/AuthContext';
import { IAuth } from '../../models/auth';
import { FixLater } from '../../models/types';
import { Account, IProfile, IPhoto } from '../../models/account';

import { ADD_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../../constants/events';
import { REGISTER, ERROR_NOTE } from '../../constants/modalConfig';
// import { FORMAT_RULES } from '../../constants/formRules';
// import BsSpinner from '../layout/Spinner'

import { validate } from '../../validators/registerForm';
import Notification from '../modals/Notification';
import ErrorNotification from '../modals/ErrorNotification';

// const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',');

const passwordIcon = <FontAwesomeIcon icon={faLock} />,
    nextIcon = <FontAwesomeIcon icon={faAngleDoubleRight} />,
    photoIcon = <FontAwesomeIcon icon={faCamera} />,
    previousIcon = <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />,
    submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

const Register: FC = () => {
    const [showStepOne, setShowStepOne] = useState<boolean>(true);
    const [photoFile, setPhotoFile] = useState<any>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [failure, setFailure] = useState<boolean>(false);

    const history = useHistory();
    const { auth }: { auth: IAuth } = useContext<FixLater>(AuthContext);
    if (auth.data) {
        return <Redirect to="/profile" />;
    }

    const initialValues = {
        pseudo: '',
        presentation: '',
        photo: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            registerAccount(values);
        },
    });

    const readFile = (file) => {
        const reader = new FileReader();
        formik.setFieldValue('photo', file);
        reader.readAsDataURL(file);
        reader.onload = () => {
            const photo: IPhoto = {
                name: file.name,
                contentType: file.type,
                content: reader.result,
            };
            setPhotoFile(photo);
        };
    };

    const registerAccount = (values) => {
        const profile: IProfile = { ...values };
        if (photoFile) {
            profile.photo = { ...photoFile };
        }

        const account = new Account(profile);
        account.emit(ADD_ACCOUNT);
        account.on(ACTION_DONE, () => {
            setSuccess(true);
        });
        account.on(ACTION_FAILED, () => {
            setFailure(true);
        });
    };

    const onCloseNotificationModal = () => {
        history.push('/login');
    };

    return (
        <>
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je m&apos;inscris...</h3>
                <Form onSubmit={formik.handleSubmit} noValidate>
                    {showStepOne && (
                        <div>
                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{pseudoIcon}*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    placeholder="mon pseudonyme"
                                    value={formik.values.pseudo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.errors.pseudo && formik.touched.pseudo && (
                                <Alert variant="danger py-0">{formik.errors.pseudo}</Alert>
                            )}
                            <Form.Group className="mt-4">
                                <Form.Control
                                    size="lg"
                                    as="textarea"
                                    name="presentation"
                                    id="presentation"
                                    placeholder="mon 'ti pitch de présentation..."
                                    rows={3}
                                    cols={30}
                                    maxLength={120}
                                    value={formik.values.presentation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <small>Caractères disponibles: {120 - formik.values.presentation.length}</small>
                            </Form.Group>

                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{photoIcon}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Label className="form-control">je charge une photo
                                <Form.File
                                    id="photo"
                                    name="photo"
                                    className="form-control d-none"
                                    onChange={(e) => {
                                        if (e.target && e.target.files) {
                                            readFile(e.target.files[0]);
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                </Form.Label>
                                
                            </InputGroup>
                            {formik.errors.photo && <Alert variant="danger py-0">{formik.errors.photo}</Alert>}

                            <ButtonGroup className="mt-4 col p-0" size="lg">                                
                                <Button variant="outline-bland p-0" disabled>
                                </Button>
                                <Button
                                    variant="secondary col-4"
                                    onClick={() => {
                                        setShowStepOne(false);
                                    }}
                                >
                                    {nextIcon}
                                </Button>
                            </ButtonGroup>
                            <div className="justify-content-right">
                                
                            </div>
                        </div>
                    )}

                    {!showStepOne && (
                        <div>
                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>@*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="mon.adresse@email.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.errors.email && formik.touched.email && (
                                <Alert variant="danger py-0">{formik.errors.email}</Alert>
                            )}

                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="mon mot de passe"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.password && formik.touched.password && (
                                    <Alert variant="danger py-0">{formik.errors.password}</Alert>
                                )}
                            </InputGroup>

                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="je confirme"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                                <Alert variant="danger py-0">{formik.errors.confirmPassword}</Alert>
                            )}
                            <ButtonGroup className="mt-4 col p-0" size="lg">
                                <Button
                                    variant="secondary p-0 col-4"
                                    onClick={() => {
                                        setShowStepOne(true);
                                    }}
                                >
                                    {previousIcon}
                                </Button>
                                <Button type="submit" variant="send" disabled={!formik.isValid}>
                                    {submitIcon} J&apos;envoie!
                                </Button>
                            </ButtonGroup>
                        </div>
                    )}

                    <Button variant="info mt-5" href="/login" block>
                        J&apos;ai déjà un compte
                    </Button>
                </Form>

                {success && <Notification config={REGISTER} onClose={onCloseNotificationModal} />}

                {failure && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </>
    );
};

export default Register;
