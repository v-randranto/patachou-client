/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, useState} from 'react';
import { useHistory } from 'react-router-dom';
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

import { FixLater } from '../../models/types';
import { IProfile, IPhoto } from '../../models/account';
import { REGISTER, ERROR_NOTE } from '../../constants/modalConfig';
import BsSpinner from '../layout/Spinner';

import { validate } from '../../validators/registerForm';
import Notification from '../modals/Notification';
import ErrorNotification from '../modals/ErrorNotification';
import { LOGIN, PROFILE } from '../../constants/paths';
import { FORMAT_RULES } from '../../constants/formRules';
import AuthService from "../services/authService";

const acceptFileExtensions = FORMAT_RULES.fileExtensions.join(',');
const passwordIcon = <FontAwesomeIcon icon={faLock} />,
    nextIcon = <FontAwesomeIcon icon={faAngleDoubleRight} />,
    photoIcon = <FontAwesomeIcon icon={faCamera} />,
    previousIcon = <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />,
    submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

const Register: FC = () => {
    
    const history = useHistory();
    const currentUser = AuthService.currentUser;
    if (currentUser) {
        history.replace(PROFILE)
    }
    const registerStateInit = {
        showStepOne: true,
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
    };
    const [registerState, setRegisterState] = useState<FixLater>(registerStateInit);
    const [photoFile, setPhotoFile] = useState<any>(false);

    
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
        setRegisterState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        const profile: IProfile = { ...values };
        if (photoFile) {
            profile.photo = { ...photoFile };
        }

        AuthService.register(profile).then(
            () => {
                setRegisterState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isSuccessful: true,
                }))
            },
            error => {              
                setRegisterState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    hasFailed: true,
                    errorCode: error.response.status || 999
                }))
            }
          );
    };

    const onCloseNotificationModal = () => {
        history.push(LOGIN);
        window.location.reload();
    };

    return (
        <div className="home">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je m&apos;inscris...</h3>
                <Form onSubmit={formik.handleSubmit} noValidate>
                    {registerState.showStepOne && (
                        <div>
                            <InputGroup className="mt-4" size="lg">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>{pseudoIcon}*</InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
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
                            {formik.errors.photo && <Alert variant="danger py-0">{formik.errors.photo}</Alert>}

                            <ButtonGroup className="mt-4 col p-0" size="lg">
                                <Button variant="outline-bland p-0" disabled></Button>
                                <Button
                                    variant="info col-3"
                                    onClick={() => {
                                        setRegisterState((prevState) => ({
                                            ...prevState,
                                            showStepOne: false,
                                        }));
                                    }}
                                >
                                    {nextIcon}
                                </Button>
                            </ButtonGroup>
                        </div>
                    )}

                    {!registerState.showStepOne && (
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
                                <Alert variant="danger py-0">{formik.errors.confirmPassword}</Alert>
                            )}

                            {!registerState.loading && (
                                <ButtonGroup className="mt-4 col p-0" size="lg">
                                    <Button
                                        variant="info p-0 col-3"
                                        onClick={() => {
                                            setRegisterState((prevState) => ({
                                                ...prevState,
                                                showStepOne: true,
                                            }));
                                        }}
                                    >
                                        {previousIcon}
                                    </Button>
                                    <Button type="submit" variant="send" disabled={!formik.isValid}>
                                        {submitIcon} J&apos;envoie!
                                    </Button>
                                </ButtonGroup>
                            )}

                            {registerState.loading && <BsSpinner />}
                        </div>
                    )}

                    <Button variant="gotolink mt-5 p-1" href={LOGIN} block>
                        J&apos;ai déjà un compte
                    </Button>
                </Form>

                {registerState.isSuccessful && <Notification config={REGISTER} onClose={onCloseNotificationModal} />}

                {registerState.hasFailed && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default Register;
