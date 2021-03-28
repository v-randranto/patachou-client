/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useAuth } from '../../../contexts/AuthContext';
import RecipesService from '../../../services/recipesService';
import RecipesItem from './RecipesItem.jsx'

const Recipes = () => {
    const { currentUser } = useAuth();
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        RecipesService.getAccountRecipes(currentUser.account._id).then((data) => {
            setRecipes(data);
        });
    }, []);

    return (
        <div className="wrapper">
            <Col md={5} className="mx-auto">
                <Card className="mt-5 border-0">
                <Card.Header>
                    Mes dernières recettes
                </Card.Header>
                <Card.Body>
                {recipes && (
                <ListGroup variant="flush">
                    {recipes.map((recipe) => (
                        <RecipesItem key={recipe._id} recipe={recipe} />
                    ))}
                </ListGroup>
                
            )}
            </Card.Body>
            </Card>
            </Col>
            
        </div>
    );
};

export default Recipes;
