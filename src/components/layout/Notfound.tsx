import React from 'react'
import Card from 'react-bootstrap/Card'
import notFoundImg from '../../img/404.png'

const NotFound: React.FC = () => {
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
            <p>Ah bin c&apos;est ballot! </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default NotFound