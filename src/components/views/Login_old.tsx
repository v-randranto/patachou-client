import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, FixLater } from '../../models/types';
import { Account, IProfile } from '../../models/account';
import { ACTION_ACCOUNT, ACTION_DONE, ACTION_FAILED } from '../../constants/events';
import { CONNECTION_ACTIONS } from '../../constants/actionTypes';
import { ERROR_NOTE } from '../../constants/modalConfig';
import ErrorNotification from '../modals/ErrorNotification';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUserNinja, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { LOST_PASSWORD, PROFILE, REGISTER } from '../../constants/paths';
import BsSpinner from '../layout/Spinner';
import { validate } from '../../validators/loginForm';
import { useFormik } from 'formik';

const passwordIcon = <FontAwesomeIcon icon={faLock} />;
const pseudoIcon = <FontAwesomeIcon icon={faUserNinja} />;
const submitIcon = <FontAwesomeIcon icon={faPaperPlane} />;

type LoginProps = { history: FixLater };

const Login: React.FC<{ history: FixLater }> = ({ history }: LoginProps) => {
    const loginStateInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: 0
    };
    const [loginState, setLoginState] = useState<FixLater>(loginStateInit);
    const { setAuthData, auth }: AuthContextType = useContext<FixLater>(AuthContext);

    const initialValues = {
        pseudo: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            loginAccount(values);
        },
    });

    const loginAccount = (values) => {
        setLoginState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        const {pseudo, password} = values
        const profile: IProfile = { pseudo, password };

        const account = new Account(profile);
        account.emit(ACTION_ACCOUNT, CONNECTION_ACTIONS.login);
        account.on(ACTION_DONE, (res) => {
            console.log('returnData', res);
            setLoginState((prevState) => ({
                ...prevState,
                isLoading: false,
                isSuccessful: true,
            }));
            setAuthData(JSON.stringify(res));
            console.log('authData', auth.data);
            history.replace(PROFILE);
        });
        account.on(ACTION_FAILED, (err) => {
            console.log(err);
            setLoginState((prevState) => ({
                ...prevState,
                isLoading: false,
                hasFailed: true,
                errorCode: err.response.status || 999
            }));
        });

    };

    // if already connected go to profile
    if (auth.data) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="home">
            <Col md="6" lg="4" className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Je me connecte...</h3>
                <Form onSubmit={formik.handleSubmit} noValidate>
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

                    {loginState.hasFailed && (loginState.errorCode === 401 || loginState.errorCode === 404) && (
                        <Alert variant="danger py-0 mt-2">Mes identifiants sont incorrects</Alert>
                    )}
                        <ButtonGroup className="mt-5 col" vertical>
                            <Button variant="gotolink p-1" href={REGISTER}>
                                Je n&apos;ai pas de compte
                            </Button>

                            <Button variant="gotolink p-1" href={LOST_PASSWORD}>
                                J&apos;ai perdu mon mot de passe
                            </Button>
                        </ButtonGroup>            

                    {loginState.loading && <BsSpinner />}
                </Form>
                {loginState.hasFailed && (loginState.errorCode !== 401 && loginState.errorCode !== 404) && <ErrorNotification config={ERROR_NOTE} />}
            </Col>
        </div>
    );
};

export default Login;
