/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';

// import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import Row from 'react-bootstrap/Row';
// import BsSpinner from '../../layout/Spinner';

import RecipesService from '../../services/recipesService';
import { validate } from '../../../validators/recipeForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const modifIcon = <FontAwesomeIcon icon={faPen} />;
const cancelIcon = <FontAwesomeIcon icon={faTimes} />;

const RecipeForm = () => {
    const saveStateInit = {
        isLoading: false,
        isSuccessful: false,
        hasFailed: false,
    };

    const readOnlyStateInit = {
        title: true,
        category: true,
        nbOfPeople: true,
    };

    const [recipeState, setRecipeState] = useState();
    const [saveState, setSaveState] = useState(saveStateInit);
    const [readOnlyState, setReadOnlyState] = useState(readOnlyStateInit);

    const initialValues = {
        title: '',
        category: '',
        nbOfPeople: '',
    };

    const location = useLocation();
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit: (values) => {
            saveRecipe(values);
        },
    });

    useEffect(() => {
        RecipesService.getRecipe(location.state).then((data) => {
            console.log(data);
            setRecipeState(data);
            formik.setFieldValue('title', data.title);
            formik.setFieldValue('category', data.category);
            formik.setFieldValue('nbOfPeople', data.nbOfPeople);
        });
    }, []);

    const disableReadOnly = (e) => {
        const cond = e.currentTarget.dataset;
        console.log('cond', cond);
        if (cond.title) {
            setReadOnlyState((prev) => ({
                ...prev,
                title: false,
            }));
        }
        if (cond.category) {
            setReadOnlyState((prev) => ({
                ...prev,
                category: false,
            }));
        }
        if (cond.nbofpeople) {
            setReadOnlyState((prev) => ({
                ...prev,
                nbOfPeople: false,
            }));
        }
    };

    const enableReadOnly = (e) => {
        const cond = e.currentTarget.dataset;
        console.log('cond', cond);
        if (cond.title) {
            setReadOnlyState((prev) => ({
                ...prev,
                title: true,
            }));
            formik.setFieldValue('title', recipeState.title);
        }
        if (cond.category) {
            setReadOnlyState((prev) => ({
                ...prev,
                category: true,
            }));
            formik.setFieldValue('category', recipeState.category);
        }
        if (cond.nbofpeople) {
            setReadOnlyState((prev) => ({
                ...prev,
                nbOfPeople: true,
            }));
            formik.setFieldValue('nbOfPeople', recipeState.nbOfPeople);
        }
    };

    const saveRecipe = (values) => {
        setSaveState((prevState) => ({
            ...prevState,
            isLoading: true,
        }));
        const recipe = { ...values };
        recipe.title = values.title.trim();
        recipe.category = values.category.trim();

        RecipesService.updateRecipe(recipeState._id, recipe).then(
            (status) => {
                console.log(status);
                setSaveState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    isSuccessful: true,
                }));
                setReadOnlyState(readOnlyStateInit)
            },
            (error) => {
                setSaveState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                    hasFailed: true,
                    errorCode: error.response.status || 999,
                }));
            },
        );
    };

    return (
        <div className="wrapper">
            <Col md={5} className="mx-auto">
                <Form onSubmit={formik.handleSubmit} noValidate>
                    <Card className="border-0">
                        <Card.Body>
                            <FormGroup as={Row} className="mt-4 ">
                                <Col>
                                    <Form.Control
                                        className="recipe"
                                        type="text"
                                        name="title"
                                        id="title"
                                        maxLength={30}
                                        placeholder="Titre"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        plaintext={readOnlyState.title}
                                        readOnly={readOnlyState.title}
                                    />
                                </Col>
                                {readOnlyState.title ? (
                                    <div data-title onClick={disableReadOnly}>
                                        {modifIcon}
                                    </div>
                                ) : (
                                    <div data-title onClick={enableReadOnly}>
                                        {cancelIcon}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup as={Row} className="mt-4 ">
                                <Form.Label column sm={4}>
                                    personnes:
                                </Form.Label>
                                <Col sm={2} className="p-1 m-0">
                                    <Form.Control
                                        className="p-0"
                                        type="number"
                                        name="nbOfPeople"
                                        id="nbOfPeople"
                                        min={2}
                                        max={8}
                                        value={formik.values.nbOfPeople}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        plaintext={readOnlyState.nbOfPeople}
                                        readOnly={readOnlyState.nbOfPeople}
                                    />
                                </Col>
                                {readOnlyState.nbOfPeople ? (
                                    <span data-nbofpeople onClick={disableReadOnly}>
                                        {modifIcon}
                                    </span>
                                ) : (
                                    <span data-nbofpeople onClick={enableReadOnly}>
                                        {cancelIcon}
                                    </span>
                                )}
                            </FormGroup>
                            <FormGroup as={Row}>
                                <Form.Label column sm={4}>
                                    Categorie:
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="category"
                                        id="category"
                                        maxLength={15}
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        plaintext={readOnlyState.category}
                                        readOnly={readOnlyState.category}
                                    />
                                </Col>
                                {readOnlyState.category ? (
                                    <span data-category onClick={disableReadOnly}>
                                        {modifIcon}
                                    </span>
                                ) : (
                                    <span data-category onClick={enableReadOnly}>
                                        {cancelIcon}
                                    </span>
                                )}
                            </FormGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button type="submit" variant="send">
                                J&apos;envoie!
                            </Button>
                        </Card.Footer>
                    </Card>
                </Form>
            </Col>
        </div>
    );
};

export default RecipeForm;
