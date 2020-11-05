import React from 'react'
import Card from 'react-bootstrap/Card'
import aboutImg from '../../img/about.jpg'

export default function About() {
  return (
    <>
    <Card className="col-lg-6 mx-auto pt-3">
      <Card.Img variant="top" src={aboutImg} />
      <Card.Body>
        <Card.Title>Mais, qui c'est-y qu'on est ?</Card.Title>
        <Card.Text>
          <p>
            Véroche avait un projet de réseau social à réaliser dans le cadre de
            sa formation de développeuse web.
          </p>
          <p>Marilou, une passionnée de pâtisserie, a apporté le thème.</p>
          <p>
            Nous espérons que vous trouverez ici un lieu de partage autour de la{' '}
            <em>gourmanderie.</em>
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  );
}
