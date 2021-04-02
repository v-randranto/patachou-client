import React, { useEffect, useReducer, useRef } from 'react';

import { useHistory,  useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import paths from '../../../constants/paths.json';

import AuthService from '../../../services/authService';
import {process} from "../../../constants/actionTypes"
import processReducer from "../../../reducers/processReducer"
import { useAuth } from '../../../contexts/AuthContext';
import ResetPasswordForm from "./ResetPasswordForm"

const ResetPassword = () => {
    const {
        currentUser
    } = useAuth();
    const history = useHistory()
    if (currentUser.isAuthenticated) {
        history.replace(paths.HOME)
    }
    const resetStatusInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: 0,
    };
    const [resetStatus, dispatch] = useReducer(processReducer, resetStatusInit)
    const { resetToken } = useParams();
    const passwordRef = useRef()

    useEffect(() => {
        if (passwordRef && passwordRef.current) {
            passwordRef.current.focus();
        }
    }, []);

    const resetPassword = (values) => {
        const { password } = values;
        dispatch({type: process.REINIT})
        AuthService.resetPassword(password, resetToken).then(
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
                <ResetPasswordForm resetPassword={resetPassword} resetStatus={resetStatus} />
            </Col>
            
        </div>
    );
};

export default ResetPassword;
