/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState} from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import RecipesService from '../../../services/recipesService';

const RecipeDetail = () => {
    const location = useLocation();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        RecipesService.getRecipe(location.state).then((data) => {
            console.log(data);
            setRecipe(data);
        });
    }, []);

    return (

    <div className="wrapper">
        <Col md={5} className="mx-auto">
            {recipe && (                
               <>
               <h4 className="text-dark text-center pt-4 pb-3">{recipe.title}</h4>
               <div>
                   <Button variant="info m-2" size="sm" >Modifier</Button>
                   <Button variant="warning m-2" size="sm">Supprimer</Button>
               </div>
                <Card className="border-0">
                    <Card.Header>Réalisation</Card.Header>
                    <Card.Body>
                        {recipe.realisation.preparationTime} min.
                    </Card.Body>
                    <Card.Header>Ingrédients</Card.Header>
                    
                    <Card.Body>
                    {recipe.ingredients.map((ingredient, i) => (
                        <p key={i}>
                            {ingredient}
                        </p>
                    ))}
                    </Card.Body>
                    <Card.Header>Instructions</Card.Header>
                        
                    <Card.Body>
                    {recipe.instructions.map((instruction, i) => (
                        <p key={i}>
                            {i+1}. {instruction}
                        </p>
                    ))}
                    </Card.Body>
                </Card>
                </>
            )}
        </Col>
    </div>
    )
};

export default RecipeDetail;
