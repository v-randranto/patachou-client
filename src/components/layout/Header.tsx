import React, { useContext } from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import brandImg from '../../img/brand.png'

import { AuthContext } from '../../contexts/AuthContext'
import { AuthContextType, FixLater } from '../../models/types'
import { ABOUT, CONTACT, HOME, LOGIN, REGISTER } from '../../constants/paths'

const Header: React.FC = () => {
  const { setAuthData, auth }: AuthContextType = useContext<FixLater>(
    AuthContext
  );

  const getPseudo = () => {
    console.log("authData", auth.data)
    let pseudo: string | null = null
    if (auth.data) {
      pseudo = JSON.parse(auth.data).account.pseudo
    }
    return pseudo
  }

  const onLogOut = () => {
    setAuthData(null)
  }

  return (
    <Navbar
      sticky="top"
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-0 px-2 mb-2"
    >
      <Navbar.Brand href={HOME}>
        <img
          src={brandImg}
          width="35"
          height="35"
          className="border rounded"
          alt=""
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={HOME}>Accueil</Nav.Link>
          <Nav.Link href={ABOUT}>A propos</Nav.Link>
          {auth.data && <Nav.Link href={CONTACT}>Contact</Nav.Link>}
        </Nav>
        {auth.data && <Navbar.Text>Salut {getPseudo()}</Navbar.Text>}

        <Nav>
          {!auth.data && (
            <>
              <Nav.Link href={REGISTER}>Inscription</Nav.Link>
              <Nav.Link href={LOGIN}>Connexion</Nav.Link>
            </>
          )}
          {auth.data && <Nav.Link onClick={onLogOut}>Déconnexion</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header