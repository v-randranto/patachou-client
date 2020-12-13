import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import brandImg from '../../img/brand.png';

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
import { useAuth } from '../../contexts/AuthContext';

const homeIcon = <FontAwesomeIcon icon={faHome} />;
const aboutIcon = <FontAwesomeIcon icon={faInfoCircle} />;
const contactIcon = <FontAwesomeIcon icon={faEnvelope} />;
const registerIcon = <FontAwesomeIcon icon={faUserPlus} />;
const loginIcon = <FontAwesomeIcon icon={faSignInAlt} />;
const logoutIcon = <FontAwesomeIcon icon={faSignOutAlt} />;
const profileIcon = <FontAwesomeIcon icon={faAddressCard} />;
const boardUserIcon = <FontAwesomeIcon icon={faColumns} />;

const Header: React.FC = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const logOut = () => {
        setCurrentUser(null)
        history.push(HOME)
    };

    return (
        <Navbar sticky="top" bg="patachou" variant="dark" className="py-0 pl-2 pr-0" expand="lg">
            <Navbar.Brand href={HOME}>
                <img src={brandImg} width="35" height="35" className="border rounded" alt="" />{' '}
                <span className="d-none d-md-inline">Patachou</span>
            </Navbar.Brand>
            <Navbar className="mr-auto p-0">
                <Nav activeKey={location.pathname}>
                    <NavLink className="d-inline mx-1" href={HOME}>
                        {homeIcon}
                        <span className="d-none d-md-inline"> accueil</span>
                    </NavLink>
                    <NavLink className="d-inline mx-1" href={ABOUT}>
                        {aboutIcon}
                        <span className="d-none d-md-inline"> à propos</span>
                    </NavLink>
                    {currentUser && currentUser.account && (
                        <NavLink className="d-inline mx-1" href={CONTACT}>
                            {contactIcon} <span className="d-none d-md-inline"> contact</span>
                        </NavLink>
                    )}
                </Nav>
            </Navbar>
            <Navbar>
                <Nav activeKey={location.pathname}>
                    {currentUser && currentUser.account && (
                        <NavLink className="d-inline mx-1" href={USER}>
                            {boardUserIcon} <span className="d-none d-md-inline">dashboard</span>
                        </NavLink>
                    )}
                </Nav>
            </Navbar>

            <Navbar className="ml-auto p-0">
                <Nav activeKey={location.pathname}>
                    {currentUser && currentUser.account && (
                        <NavLink className="d-inline mx-1" href={PROFILE}>
                            {profileIcon} <span className="d-none d-md-inline">{currentUser.account.pseudo}</span>
                        </NavLink>
                    )}

                    {!currentUser && (
                        <>
                            <NavLink className="d-inline mx-1" href={REGISTER}>
                                {registerIcon} <span className="d-none d-md-inline">inscription</span>
                            </NavLink>
                            <NavLink className="d-inline mx-1" href={LOGIN}>
                                {loginIcon}
                                <span className="d-none d-md-inline"> connexion</span>
                            </NavLink>
                        </>
                    )}

                    {currentUser && currentUser.account && (
                        <NavLink className="d-inline mx-1" onClick={logOut}>
                            {logoutIcon}
                            <span className="d-none d-md-inline"> déconnexion</span>
                        </NavLink>
                    )}
                </Nav>
            </Navbar>
        </Navbar>
    );
};

export default withRouter(Header);