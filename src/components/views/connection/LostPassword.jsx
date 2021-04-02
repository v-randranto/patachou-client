import React, { useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import AuthService from '../../../services/authService';
import {process} from "../../../constants/actionTypes"
import processReducer from "../../../reducers/processReducer"
import { useAuth } from '../../../contexts/AuthContext';
import paths from "../../../constants/paths.json"
import LostPasswordForm from "./LostPasswordForm"

const LostPassword: React.FC = () => {
    const { currentUser } = useAuth();
    const history = useHistory();
if (currentUser.isAuthenticated) {
    history.replace(paths.HOME)
}
    const lostStatusInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
        errorCode: null
    };
    const [lostStatus, dispatch] = useReducer(processReducer, lostStatusInit)

    const sendPasswordLink = (values) => {
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
                <LostPasswordForm sendPasswordLink={sendPasswordLink} lostStatus={lostStatus} />
            </Col>
        </div>
    );
};

export default LostPassword;
