import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AuthContext } from '../../contexts/AuthContext';
import { IAuth } from '../../models/auth';
import { FixLater } from '../../models/types';

import { LOGIN, REGISTER } from '../../constants/paths';

const Home: React.FC = () => {
    const { auth }: { auth: IAuth } = useContext<FixLater>(AuthContext);
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

            {!auth.data && (
                <Col md={5} className="mx-auto my-5">
                  <ButtonGroup className="mt-4 col" size="lg">
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
