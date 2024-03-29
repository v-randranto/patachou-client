import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'
import Media from 'react-bootstrap/Media'
import { useAuth } from '../../../contexts/AuthContext'
import { ddmmyyyyFormat } from '../../../utils/dateHandler'
import { toTitleCase } from '../../../utils/textFormat'
import paths from '../../../constants/paths.json'

const Profile = () => {
   const { account } = useAuth().currentUser.user
   return (
      <div className="wrapper">
         <Col md={5} className="mx-auto">
            <h3 className="text-dark text-center pt-4 pb-3 ">Mon profil</h3>
            <Card className="m-0 border-0">
               <Card.Body>
                  <div className="bg-profile p-2">
                     <Media>
                        <Image className="my-2 mr-2" src={account.photoUrl} rounded width="60px" />
                        <Media.Body>
                           <h4 className="text-dark">{toTitleCase(account.pseudo)}</h4>
                           <p className="text-dark p-0 m-0">
                              Membre depuis le {ddmmyyyyFormat(new Date(account.creationDate))}
                           </p>
                        </Media.Body>
                     </Media>

                     <hr style={{ border: '2px solid #343a40', borderRadius: '2px' }} />
                     <p className="text-dark">{account.presentation}</p>
                  </div>
                  <div className="d-flex justify-content-end">
                     <Button variant="info mt-3" to="#" disabled>
                        Je modifie mon compte
                     </Button>
                  </div>
               </Card.Body>
            </Card>
            <ButtonGroup className="mt-5 col" size="lg">
               <Button as={Link} variant="choice1" to={paths.RECIPES}>
                  Mes recettes
               </Button>

               <Button as={Link} variant="choice2" to="#" disabled>
                  Mes potes
               </Button>
            </ButtonGroup>
         </Col>
      </div>
   )
}

export default Profile
