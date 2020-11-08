import React, { useContext } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import brandImg from '../../img/brand.png'
import { AuthContext } from '../../contexts/AuthContext'
import { AuthContextType, FixLater } from '../../models/types'

export default function Header() {
  const { setAuthData, auth }: AuthContextType = useContext<FixLater>(
    AuthContext
  );

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
      <Navbar.Brand href="/home">
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
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">A propos</Nav.Link>
          {auth.data && <Nav.Link href="/contact">Contact</Nav.Link>}
        </Nav>
        {auth.data && <Navbar.Text>Salut {auth.data}</Navbar.Text>}

        <Nav>
          {!auth.data && (
            <>
              <Nav.Link href="/register">Inscription</Nav.Link>
              <Nav.Link href="/login">Connexion</Nav.Link>
            </>
          )}
          {auth.data && <Nav.Link onClick={onLogOut}>Déconnexion</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
