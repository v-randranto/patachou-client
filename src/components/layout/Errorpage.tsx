import React from 'react'
import Card from 'react-bootstrap/Card'
import {IMG_BASE_URL, ERROR_PAGE_IMG} from '../../constants/img-url'

export default function Errorpage() {
  const errorPageImg = `${IMG_BASE_URL}${ERROR_PAGE_IMG}`
  return (
    <>
      <Card className="col-lg-6 mx-auto pt-3">
        <Card.Img
          variant="top"
          src={errorPageImg}
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
