import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

export default function home() {
  return (
    <div className="home py-5">
      <div className="h-40 mx-0" style={{ backgroundColor: 'ivory' }}>
        <div className="mx-auto p-3">
          <h2 className="display-5 text-center text-uppercase">
            Bienvenue sur Patachou !
          </h2>
          <p className="intro my-3 text-md-center">
            La vie est courte, commençons par le dessert!
            <br />
            Patachou est consacré à la pâtisserie: 100%
            gourmandise.
            <br />
            On y partage recettes, astuces et combines entre
            becs sucrés.
          </p>
        </div>
      </div>

      <Col md="8" lg="6" className="mx-auto my-5 ">
       
          <Button variant="dark mx-4 my-3" href="/login">
            Je me connecte
          </Button>
     
          <Button variant="info mx-4 my-3" href="/register">
            Je me crée un compte
          </Button>
      </Col>
    </div>
  );
}
