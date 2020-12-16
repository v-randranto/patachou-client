/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';
import {useHistory} from 'react-router-dom'

import {RECIPE_DETAIL} from '../../../constants/paths'

const RecipesItem = ({recipe}) => {  
    const history = useHistory()
    const handleClick = () => {
        history.push({ 
            pathname: RECIPE_DETAIL,
            state: recipe._id
           })
    }
    return (
        <>
            <ListGroup.Item className="p-1" onClick={handleClick}>{recipe.title}</ListGroup.Item>            
        </>
    );
};


RecipesItem.propTypes = {
    recipe: PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            privacyLevel: PropTypes.number,
        }),    
};

export default RecipesItem;
