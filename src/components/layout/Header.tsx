import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {IMG_BASE_URL, BRAND_IMG} from '../../constants/img-url'

export default function Header() {
    const brandImg = `${IMG_BASE_URL}${BRAND_IMG}`
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg" className="py-0 px-2 mb-2">
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
          <NavDropdown title="Informations" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">A propos</NavDropdown.Item>
            <NavDropdown.Item href="/contact">
              Contact
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/register">Inscription</Nav.Link>
          <Nav.Link href="/login">Connexion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
