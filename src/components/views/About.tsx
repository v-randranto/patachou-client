import React from 'react'
import Card from 'react-bootstrap/Card'
import aboutImg from '../../img/about.jpg'

const About: React.FC = () => {
  return (
    <div className="home">
    <Card className="col-lg-6 mx-auto pt-3">
      <Card.Img variant="top" src={aboutImg} />
      <Card.Body>
        <Card.Title>Mais, qui c&apos;est-y qu&apos;on est ?</Card.Title>
        <Card.Text>
            Véroche avait un projet de réseau social à réaliser dans le cadre de
            sa formation de développeuse web.
          Marilou, une passionnée de pâtisserie, a apporté le thème.        
            Nous espérons que vous trouverez ici un lieu de partage autour de la
            {' '}<em>gourmanderie.</em>
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default About