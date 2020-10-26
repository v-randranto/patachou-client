import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

export default function Profile() {
  return (
    <Col md="6" lg="4" className="mx-auto pt-3">
      <h5 className="text-center text-white">Véroche</h5>
      <div className="text-center">
        <Image
          src="https://res.cloudinary.com/ndege65/image/upload/v1603743572/patachou/assets/default-avatar_c2s9sr.png"
          rounded
          width="45px"
        />
        <div className="text-center">
          <small className="text-white">Membre depuis le 01/10/2020</small>
        </div>
      </div>

      <div className="mx-auto my-3">bla bla de présentation</div>

      <Button className="my-3" variant="outline-primary" block>
        Identifiants
      </Button>
      <Button className="my-3" variant="outline-primary" block>
        Présentation
      </Button>
    </Col>
  );
}
