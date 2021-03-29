/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useRef, useEffect, useReducer, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import BsSpinner from '../../layout/Spinner';
import Notification from '../../modals/Notification';
import ErrorNotification from '../../modals/ErrorNotification';

import AuthService from '../../../services/authService';
import { validate } from '../../../validators/registerForm';

import paths from '../../../constants/paths.json';
import { FORMAT_RULES } from '../../../constants/formRules';
import { REGISTER, ERROR_NOTE } from '../../../constants/modalConfig';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCamera,
    faLock,
    faPaperPlane,
    faTimes,    
    faUserNinja
} from '@fortawesome/free-solid-svg-icons';

import {process} from "../../../constants/actionTypes"
import processReducer from "../../../reducers/processReducer"

const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',');
const 
    nextIcon = <FontAwesomeIcon icon={faAngleDoubleRight} />,
    passwordIcon = <FontAwesomeIcon icon={faLock} />,    
    photoIcon = <FontAwesomeIcon icon={faCamera} />,
    previousIcon = <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />,
    resetIcon = <FontAwesomeIcon icon={faTimes} />,    
    submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

const Register: FC = () => {

    const registerStatusInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        emailHasFailed: false,        
        errorCode: null
    };
    const [registerStatus, dispatch] = useReducer(processReducer,
        registerStatusInit)
    const [showStepOne, setShowStepOne] = useState(true);
    const [photoFile, setPhotoFile] = useState();

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

    const history = useHistory();
    const pseudoRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        if (showStepOne) {
            if (pseudoRef && pseudoRef.current) {
                pseudoRef.current.focus();
            }
        } else {
            if (emailRef && emailRef.current) {
                emailRef.current.focus();
            }
        }
    }, [showStepOne]);

    const disableResetStep = (step) => {
        if (step === 'one') {
            if (formik.touched.pseudo || formik.touched.presentation) {
                return false;
            }
        } else {
            if (formik.touched.email || formik.touched.password || formik.touched.confirmPassword) {
                return false;
            }
        }
        return true;
    };

    const goToStepTwo = () => {
        setShowStepOne(false);
    };
    
    const onCloseNotificationModal = () => {
        history.push(paths.LOGIN);
        window.location.reload();
    };

    const readFile = (file) => {
        if (file) {
            const reader = new FileReader();
            formik.setFieldValue('photo', file);
            reader.readAsDataURL(file);
            reader.onload = () => {
                const photo = {
                    name: file.name,
                    contentType: file.type,
                    content: reader.result,
                };
                setPhotoFile(photo);
            };
        }
    };

    const resetPhotoInput = () => {
        setPhotoFile(null);
    };
    
    const resetStep = (...props) => {
        props.forEach((prop) => {
            formik.setFieldValue(prop, '');
            formik.setFieldTouched(prop, false);
        });
    };

    const stepOneIsValid = () => {
        if (!formik.touched.pseudo) return true;
        if (formik.errors) {
            if (formik.errors.pseudo || formik.errors.photo) {
                return true;
            }
        }
    }; 

    const registerAccount = (values) => {
        dispatch({type: process.REINIT})
        const profile = { ...values };
        profile.pseudo = values.pseudo.trim();
        profile.email = values.email.trim();
        if (photoFile) {
            profile.photo = { ...photoFile };
        }

        AuthService.register(profile).then(
            (data) => {
                dispatch({type: process.SUCCESS, emailHasFailed: !data.emailIsSent})
            },
            (error) => {
                // formik.setFieldError('pseudo', 'Pseudo déjà utilisé');
                // setShowStepOne(true);
                dispatch({type: process.FAILURE, errorCode: error.statusCode })
            },
        );
    };

    return (
        <div className="wrapper">
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
                                    ref={pseudoRef}
                                    type="text"
                                    name="pseudo"
                                    id="pseudo"
                                    maxLength={20}
                                    placeholder="mon pseudonyme"
                                    value={formik.values.pseudo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            <small>De longueur 20 max. et sans caractères spéciaux</small>
                            {formik.errors.pseudo && formik.touched.pseudo && (
                                <Alert variant="danger py-0">{formik.errors.pseudo}</Alert>
                            )}

                            <Form.Group className="mt-2">
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
                                <small>{120 - formik.values.presentation.length} caractères disponibles </small>
                            </Form.Group>

                            <InputGroup className="mt-2" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{photoIcon}</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Label className="form-control">
                                    <span className="text-secondary">
                                        {photoFile ? photoFile.name : 'Je charge ma photo'}
                                    </span>
                                    <Form.File
                                        className="form-control d-none"
                                        accept={acceptFileExtensions}
                                        onChange={(e) => {
                                            if (e.target && e.target.files) {
                                                readFile(e.target.files[0]);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </Form.Label>
                                <small>Fichier de 500ko max. et d&apos;extension jpg, jpeg, png ou gif</small>
                            </InputGroup>
                            <span onClick={resetPhotoInput}>X</span>
                            {formik.errors.photo && <Alert variant="danger py-0">{formik.errors.photo}</Alert>}

                            <ButtonGroup className="mt-4 col p-0" size="lg">
                                <Button
                                    variant="secondary offset-6 col-3"
                                    onClick={() => {
                                        resetStep('pseudo', 'presentation', 'photo');
                                        setPhotoFile(null);
                                    }}
                                    disabled={disableResetStep('one')}
                                >
                                    {resetIcon}
                                </Button> 

                                <Button variant="info col-3" onClick={goToStepTwo} disabled={stepOneIsValid()}>
                                    {nextIcon}
                                </Button>
                            </ButtonGroup>
                        </div>
                    )}

                    {!showStepOne && (
                        <div>
                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>@*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    ref={emailRef}
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
                                <Alert variant="danger py-0 mt-1">{formik.errors.email}</Alert>
                            )}

                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{passwordIcon}*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
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

                            {!registerStatus.loading && (
                                <ButtonGroup className="mt-4 col p-0" size="lg">
                                    <Button variant="info p-0 col-3" onClick={() => setShowStepOne(true)}>
                                        {previousIcon}
                                    </Button>
                                    <Button type="submit" variant="send" disabled={!formik.isValid}>
                                        {submitIcon} J&apos;envoie!
                                    </Button>
                                    <Button
                                        variant="secondary p-0 col-3"
                                        onClick={() => resetStep('email', 'password', 'confirmPassword')}
                                        disabled={disableResetStep('two')}
                                    >
                                        {resetIcon}
                                    </Button>
                                </ButtonGroup>
                            )}

                            {registerStatus.loading && <BsSpinner />}
                        </div>
                    )}

                    <Button variant="gotolink mt-5 p-1" href={paths.LOGIN} block>
                        J&apos;ai déjà un compte
                    </Button>
                </Form>

                {registerStatus.isSuccessful && (
                    <Notification
                        config={REGISTER}
                        emailHasFailed={registerStatus.emailHasFailed}
                        onClose={onCloseNotificationModal}
                    />
                )}

                {registerStatus.hasFailed && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default Register;
