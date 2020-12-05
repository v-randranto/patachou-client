import React, { useState, useEffect } from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import brandImg from '../../img/brand.png';

import { FixLater } from '../../models/types';
import { ABOUT, ADMIN, CONTACT, HOME, LOGIN, REGISTER, PROFILE, USER } from '../../constants/paths';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faInfoCircle,
    faEnvelope,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faAddressCard,
    faTable,
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
const boardAdminIcon = <FontAwesomeIcon icon={faTable} />;

const Header: React.FC = () => {
    const [currentAccount, setCurrentAccount] = useState<FixLater>();
    const [showBoardAdmin, setShowBoardAdmin] = useState<boolean>(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentAccount(user.account);
            setShowBoardAdmin(true);
        }
    }, [currentAccount]);

    
  const logOut = () => {
    AuthService.logout();
  }

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
                    {currentAccount && (
                        <Nav.Link className="d-inline mx-2" href={CONTACT}>
                            {contactIcon} <span className="d-none d-md-inline"> contact</span>
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar>
            <Navbar>
                <Nav>
                {showBoardAdmin && (
                    <Nav.Link className="d-inline mx-2" href={USER}>
                        {boardAdminIcon} <span className="d-none d-md-inline">administration</span>
                    </Nav.Link>
                    )}
                {currentAccount && (
                    <Nav.Link className="d-inline mx-2" href={ADMIN}>
                        {boardUserIcon} <span className="d-none d-md-inline">dashboard</span>
                    </Nav.Link>
                    )}
                </Nav>
            </Navbar>

            <Navbar className="ml-auto p-0">
                <Nav>
                    {currentAccount && (
                        <Nav.Link className="d-inline mx-2" href={PROFILE}>
                            {profileIcon} <span className="d-none d-md-inline">{currentAccount.pseudo}</span>
                        </Nav.Link>
                    )}

                    {!currentAccount && (
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
                    {currentAccount && (
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
