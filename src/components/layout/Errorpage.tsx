import React from 'react'
import Card from 'react-bootstrap/Card'
import errorImg from '../../img/error.jpg'

export default function ErrorPage() {
  
  return (
    <>
      <Card className="col-lg-6 mx-auto pt-3">
        <Card.Img
          variant="top"
          src={errorImg}
        />
        <Card.Body>
          <Card.Title>Oups, des corps étrangers dans la pâte! </Card.Title>
          <Card.Text>
            <p>
              Nous vous prions de nous excuser pour cet incident. Merci de
              réessayer plus tard.
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
