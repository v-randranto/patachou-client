import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import { useAuth } from '../../../contexts/AuthContext';
import { ddmmyyyyFormat } from '../../../utils/dateHandler';
import { RECIPES } from '../../../constants/paths';

const Profile: React.FC = () => {
    const { currentUser } = useAuth();
    return (
        <div className="wrapper">
            <Col md={5} className="mx-auto">
                <h3 className="text-dark text-center pt-4 pb-3 ">Mon profil</h3>
                <Card className="m-0 border-0">
                    <Card.Body>
                        <div className="bg-profile p-2">
                            <Media>
                                <Image className="my-2 mr-2" src={currentUser.account.photoUrl} rounded width="60px" />
                                <Media.Body>
                                    <h4 className="text-dark">{currentUser.account.pseudo}</h4>
                                    <p className="text-dark p-0 m-0">
                                        Membre depuis le {ddmmyyyyFormat(new Date(currentUser.account.creationDate))}
                                    </p>
                                </Media.Body>
                            </Media>

                            <hr style={{ border: '2px solid #343a40', borderRadius: '2px' }} />
                            <p className="text-dark">{currentUser.account.presentation}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                        <Button variant="info mt-3" href="#" disabled>
                        Je modifie mon compte
                    </Button>
                    </div>
                    </Card.Body>
                </Card>
                <ButtonGroup className="mt-5 col" size="lg">
                    <Button variant="choice1" href={RECIPES}>
                        Mes recettes
                    </Button>

                    <Button variant="choice2" href="#" disabled>
                        Mes potes
                    </Button>
                </ButtonGroup>
            </Col>
        </div>
    );
};

export default Profile;
