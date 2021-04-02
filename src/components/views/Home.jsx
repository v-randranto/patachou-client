import React from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { useAuth } from '../../contexts/AuthContext'

import paths from '../../constants/paths.json'

const Home = () => {
   const mediaQuery = window.matchMedia('(max-width: 640px)')
   const { currentUser } = useAuth()

   return (
      <div className="wrapper pt-5">
         <div className="h-40 mx-0" style={{ backgroundColor: 'ivory' }}>
            <div className="mx-auto p-3">
               <h2 className="display-5 text-center text-uppercase">Bienvenue sur Patachou !</h2>
               <p className="intro my-3 text-md-center">
                  La vie est courte, commençons par le dessert!
                  <br />
                  Patachou est consacré à la pâtisserie: 100% gourmandise.
                  <br />
                  On y partage recettes, astuces et combines entre becs sucrés.
               </p>
            </div>
         </div>

         {!currentUser && (
            <Col md={5} className="mx-auto my-5">
               <ButtonGroup className="mt-4 col" size="lg" vertical={mediaQuery.matches}>
                  <Button as={Link} variant="choice1" to={paths.REGISTER}>
                     &nbsp;&nbsp;&nbsp;Je m&apos;inscris&nbsp;&nbsp;&nbsp;
                  </Button>

                  <Button as={Link} variant="choice2" to={paths.LOGIN}>
                     Je me connecte
                  </Button>
               </ButtonGroup>
            </Col>
         )}
      </div>
   )
}

export default Home
