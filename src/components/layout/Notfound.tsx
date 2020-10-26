import React from 'react'
import Card from 'react-bootstrap/Card'
import {IMG_BASE_URL, NOT_FOUND_IMG} from '../../constants/img-url'

export default function Notfound() {
  const notFoundImg = `${IMG_BASE_URL}${NOT_FOUND_IMG}`
  return (
    <>
      <Card bg="secondary" text="white" className="col-lg-3 mx-auto pt-3">
        <Card.Img
          variant="top"
          src={notFoundImg}
        />
        <Card.Body>
          <Card.Title>Oups, ingrédient introuvable! </Card.Title>
          <Card.Text>
            <p>Ah bin c'est ballot! </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
