import React, {useContext} from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { AuthContextType, FixLater } from '../../models/types'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

const Profile: React.FC = () => {
  const { auth }: AuthContextType = useContext<FixLater>(
    AuthContext
  )

  const {pseudo, presentation, creationDate, photoUrl} = auth.data ? JSON.parse(auth.data).account : null;

  return (
    <Col md="6" lg="4" className="mx-auto pt-3">
      <h5 className="text-center text-white">{pseudo}</h5>
      <div className="text-center">
        <Image
          src={photoUrl}
          rounded
          width="45px"
        />
        <div className="text-center">
  <small className="text-white">Membre depuis le {creationDate}</small>
        </div>
      </div>

  <div className="mx-auto my-3">{presentation}</div>

      <Button className="my-3" variant="outline-primary" block>
        Identifiants
      </Button>
      <Button className="my-3" variant="outline-primary" block>
        Présentation
      </Button>
    </Col>
  )
}

export default Profile