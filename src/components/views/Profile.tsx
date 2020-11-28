import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { AuthContextType, FixLater } from '../../models/types';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import {ddmmyyyyFormat} from '../../utils/dateHandler'

const Profile: React.FC = () => {
    const { auth }: AuthContextType = useContext<FixLater>(AuthContext);

    const { pseudo, presentation, creationDate, photoUrl } = auth.data ? JSON.parse(auth.data).account : null;

    return (
        <div className="home">
            <Col md={5} className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Mon profil</h3>
                <Card className="m-0 border-0">                   
                    <Card.Body>
                        <Media >
                            <Image className="mr-2" src={photoUrl} rounded width="60px" />
                            <Media.Body>
                                <h4 className="text-dark">{pseudo}</h4>
                                <small className="text-dark">Membre depuis le {ddmmyyyyFormat(new Date(creationDate))}</small>
                            </Media.Body>
                        </Media>
                        <hr style={{border: "2px solid #343a40", borderRadius: "2px"}} />
                        <p className="text-dark">{presentation}</p>
                    </Card.Body>
                </Card>
                <ButtonGroup className="mt-5 col" size="lg">
                    <Button variant="choice1" href="#">
                        Mes recettes
                    </Button>

                    <Button variant="choice2" href="#">
                        Mes potes
                    </Button>
                </ButtonGroup>
            </Col>
        </div>
    );
};

export default Profile;
