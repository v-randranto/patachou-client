import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import brandImg from '../../img/brand.png';

import { FixLater } from '../../models/types';
import { ABOUT, CONTACT, HOME, LOGIN, REGISTER, PROFILE, USER } from '../../constants/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faInfoCircle,
    faEnvelope,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faAddressCard,
    faColumns,
} from '@fortawesome/free-solid-svg-icons';
import AuthService from '../services/authService.js';

const homeIcon = <FontAwesomeIcon icon={faHome} />;
const aboutIcon = <FontAwesomeIcon icon={faInfoCircle} />;
const contactIcon = <FontAwesomeIcon icon={faEnvelope} />;
const registerIcon = <FontAwesomeIcon icon={faUserPlus} />;
const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;
const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />;
const profileIcon = <FontAwesomeIcon icon={faAddressCard} />;
const boardUserIcon = <FontAwesomeIcon icon={faColumns} />;

const Header: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<FixLater>(AuthService.currentUser);
    const history = useHistory();
    useEffect(() => {
        setCurrentUser(AuthService.currentUser);
    }, []);

    const logOut = () => {
        console.log('click logout');
        AuthService.logout();
        history.push(HOME)
    };

    return (
        <Navbar sticky="top" bg="patachou" variant="dark" className="py-0 pl-2 pr-0" expand="lg">
            <Navbar.Brand href={HOME}>
                <img src={brandImg} width="35" height="35" className="border rounded" alt="" />{' '}
                <span className="d-none d-md-inline">Patachou</span>
            </Navbar.Brand>
            <Navbar className="mr-auto p-0">
                <Nav>
                    <Nav.Link className="d-inline mx-2" href={HOME}>
                        {homeIcon}
                        <span className="d-none d-md-inline"> accueil</span>
                    </Nav.Link>
                    <Nav.Link className="d-inline mx-2" href={ABOUT}>
                        {aboutIcon}
                        <span className="d-none d-md-inline"> à propos</span>
                    </Nav.Link>
                    {currentUser && currentUser.account && (
                        <Nav.Link className="d-inline mx-2" href={CONTACT}>
                            {contactIcon} <span className="d-none d-md-inline"> contact</span>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar>
            <Navbar>
                <Nav>
                    {currentUser && currentUser.account && (
                        <Nav.Link className="d-inline mx-2" href={USER}>
                            {boardUserIcon} <span className="d-none d-md-inline">dashboard</span>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar>

            <Navbar className="ml-auto p-0">
                <Nav>
                    {currentUser && currentUser.account && (
                        <Nav.Link className="d-inline mx-2" href={PROFILE}>
                            {profileIcon} <span className="d-none d-md-inline">{currentUser.account.pseudo}</span>
                        </Nav.Link>
                    )}

                    {!currentUser && (
                        <>
                            <Nav.Link className="d-inline mx-2" href={REGISTER}>
                                {registerIcon} <span className="d-none d-md-inline">inscription</span>
                            </Nav.Link>
                            <Nav.Link className="d-inline mx-2" href={LOGIN}>
                                {loginIcon}
                                <span className="d-none d-md-inline"> connexion</span>
                            </Nav.Link>
                        </>
                    )}

                    {currentUser && currentUser.account && (
                        <Nav.Link className="d-inline mx-2" onClick={logOut}>
                            {logoutIcon}
                            <span className="d-none d-md-inline"> déconnexion</span>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar>
        </Navbar>
    );
};

export default Header;
