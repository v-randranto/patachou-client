import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import AuthService from "../services/authService.js";
import { FixLater } from '../../models/types';

import { LOGIN, REGISTER } from '../../constants/paths';

const Home: React.FC = () => {
    const [currentUser] = useState<FixLater>(AuthService.currentUser)
    const mediaQuery = window.matchMedia('(max-width: 640px)')
    
    return (
        <div className="home pt-5">
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
                    <Button variant="choice1" href={REGISTER}>
                    &nbsp;&nbsp;&nbsp;Je m&apos;inscris&nbsp;&nbsp;&nbsp;
                    </Button>

                    <Button variant="choice2" href={LOGIN}>
                        Je me connecte
                    </Button>
                    </ButtonGroup>
                </Col>
            )}
        </div>
    );
};

export default Home;
