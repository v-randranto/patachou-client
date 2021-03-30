import React, { useEffect, useRef, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { ERROR_NOTE } from '../../../constants/modalConfig';
import ErrorNotification from '../../modals/ErrorNotification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserNinja, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import paths from '../../../constants/paths.json';
import BsSpinner from '../../layout/Spinner';
import { validate } from '../../../validators/loginForm';
import { useFormik } from 'formik';
import AuthService from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import {process, connection} from "../../../constants/actionTypes"
import processReducer from "../../../reducers/processReducer"

const passwordIcon = <FontAwesomeIcon icon={faLock} />;
const pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />;
const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

const Login: React.FC = () => {
    const history = useHistory();
    const { currentUser, userDispatch } = useAuth();
    if (currentUser.isAuthenticated) {
        history.replace(paths.HOME)
    }
    const loginStatusInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: null
    }
    const [loginStatus, loginStatusDispatch] = useReducer(processReducer, loginStatusInit)
    const initialValues = {
        pseudo: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            loginSubmit(values);
        },
    });

    const pseudoRef = useRef(null);
    useEffect(() => {
        if (pseudoRef && pseudoRef.current) {
            pseudoRef.current.focus();
        }
    }, []);

    const loginSubmit = (values) => {
        loginStatusDispatch({type: process.REINIT})
        const { pseudo, password } = values;
        const identification = { pseudo, password };
        identification.pseudo = values.pseudo.trim();

        AuthService.login(identification).then(
            (user) => {
                loginStatusDispatch({type: process.SUCCESS})
                userDispatch({type: connection.LOGIN, user});
                history.replace(paths.PROFILE);
            },
            (error) => {
                loginStatusDispatch({type: process.FAILURE, errorCode: error.statusCode})
            },
        );
    };

    return (
        <div className="wrapper">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
                <Form onSubmit={formik.handleSubmit} noValidate>
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
                    {formik.errors.pseudo && formik.touched.pseudo && (
                        <Alert variant="danger py-0">{formik.errors.pseudo}</Alert>
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
                    {formik.errors.password && formik.touched.password && (
                        <Alert variant="danger py-0">{formik.errors.password}</Alert>
                    )}

                    <ButtonGroup className="mt-4 col p-0" size="lg">
                        <Button type="submit" variant="send">
                            {submitIcon} J&apos;envoie!
                        </Button>
                    </ButtonGroup>

                    {loginStatus.hasFailed && (loginStatus.errorCode === 401 || loginStatus.errorCode === 404) && (
                        <Alert variant="danger py-0 mt-2">Mes identifiants sont incorrects</Alert>
                    )}
                    <ButtonGroup className="mt-5 col" vertical>
                        
                        <Button variant="gotolink p-1" href={paths.REGISTER}>
                            Je n&apos;ai pas de compte
                        </Button>

                        <Button variant="gotolink p-1" href={paths.LOST_PASSWORD}>
                            J&apos;ai perdu mon mot de passe
                        </Button>
                    </ButtonGroup>

                    {loginStatus.loading && <BsSpinner />}
                </Form>
                {loginStatus.hasFailed && loginStatus.errorCode !== 401 && loginStatus.errorCode !== 404 && (
                    <ErrorNotification config={ERROR_NOTE} />
                )}
            </Col>
        </div>
    );
};

export default Login;
