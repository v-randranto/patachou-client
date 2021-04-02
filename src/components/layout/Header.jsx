import React from 'react';
import { Link, NavLink, useHistory, useLocation, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import BsNavLink from 'react-bootstrap/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import brandImg from '../../img/brand.png';

import paths from '../../constants/paths.json';
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

import AuthService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import { connection } from '../../constants/actionTypes';

const homeIcon = <FontAwesomeIcon icon={faHome} />;
const aboutIcon = <FontAwesomeIcon icon={faInfoCircle} />;
const contactIcon = <FontAwesomeIcon icon={faEnvelope} />;
const registerIcon = <FontAwesomeIcon icon={faUserPlus} />;
const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;
const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />;
const profileIcon = <FontAwesomeIcon icon={faAddressCard} />;
const boardUserIcon = <FontAwesomeIcon icon={faColumns} />;

const Header = () => {
    const { currentUser, userDispatch } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const logOut = () => {
        AuthService.logout();
        userDispatch({ type: connection.LOGOUT });
        history.push(paths.HOME);
    };

    const { isAuthenticated, user } = currentUser;

    return (
        <Navbar sticky="top" bg="patachou" variant="dark" className="py-0 pl-2 pr-0" expand="lg">
            <Navbar.Brand as={Link} to={paths.HOME}>
                <img src={brandImg} width="35" height="35" className="border rounded" alt="" />
                <span className="d-none d-md-inline">Patachou</span>
            </Navbar.Brand>
            <Navbar className="mr-auto p-0">
                <Nav activeKey={location.pathname}>
                    <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.HOME}>
                        {homeIcon}
                        <span className="d-none d-md-inline"> accueil</span>
                    </BsNavLink>
                    <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.ABOUT}>
                        {aboutIcon}
                        <span className="d-none d-md-inline"> à propos</span>
                    </BsNavLink>
                    {isAuthenticated && (
                        <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.CONTACT}>
                            {contactIcon} <span className="d-none d-md-inline"> contact</span>
                        </BsNavLink>
                    )}
                </Nav>
            </Navbar>
            <Navbar>
                <Nav activeKey={location.pathname}>
                    {isAuthenticated && (
                        <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.USER}>
                            {boardUserIcon} <span className="d-none d-md-inline">dashboard</span>
                        </BsNavLink>
                    )}
                </Nav>
            </Navbar>

            <Navbar className="ml-auto p-0">
                <Nav activeKey={location.pathname}>
                    {isAuthenticated && (
                        <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.PROFILE}>
                            {profileIcon} <span className="d-none d-md-inline">{user.account.pseudo}</span>
                        </BsNavLink>
                    )}

                    {!isAuthenticated && (
                        <>
                            <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.REGISTER}>
                                {registerIcon} <span className="d-none d-md-inline">inscription</span>
                            </BsNavLink>
                            <BsNavLink as={NavLink} className="d-inline mx-1" to={paths.LOGIN}>
                                {loginIcon}
                                <span className="d-none d-md-inline"> connexion</span>
                            </BsNavLink>
                        </>
                    )}

                    {isAuthenticated && (
                        <BsNavLink className="d-inline mx-1" onClick={logOut}>
                            {logoutIcon}
                            <span className="d-none d-md-inline"> déconnexion</span>
                        </BsNavLink>
                    )}
                </Nav>
            </Navbar>
        </Navbar>
    );
};

export default withRouter(Header);
