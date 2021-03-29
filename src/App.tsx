/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Container from 'react-bootstrap/Container'

import About from './components/views/About'
import BoardAdmin from "./components/views/BoardAdmin";
import BoardUser from "./components/views/BoardUser";
import Contact from './components/views/Contact'
import Header from './components/layout/Header'
import Home from './components/views/Home'
import Login from './components/views/connection/Login.jsx'
import LostPassword from './components/views/connection/LostPassword.jsx'
import NotFound from './components/layout/NotFound'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './components/views/profile/Profile'
import Recipes from './components/views/recipes/Recipes.jsx'
import RecipeDetail from './components/views/recipes/RecipeDetail.jsx'
import RecipeForm from './components/views/recipes/RecipeForm.jsx'
import Register from './components/views/connection/Register.jsx'
import ResetPassword from './components/views/connection/ResetPassword.jsx'

import { AuthContext } from "./contexts/AuthContext.js";
import AuthService from "./services/authService.js";
import paths from "./constants/paths.json"

const App: React.FC = () => {

    const [currentUser, setCurrentUser] = useState(AuthService.currentUser);   
    const setUser = (data) => {
        console.log('>set user data', data)
        AuthService.setCurrentUser(data);
        setCurrentUser(data);
      }

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser: setUser}}>
        <Router >
            <Container className="p-0">
                <Header />
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route exact path={paths.ABOUT}><About /></Route>
                    <Route exact path={paths.HOME} ><Home /></Route>
                    <Route exact path={paths.LOGIN} ><Login /></Route>
                    <Route exact path={paths.LOST_PASSWORD} ><LostPassword /></Route>
                    <Route exact path={paths.REGISTER} ><Register /></Route>
                    <Route exact path={`${paths.RESET_PASSWORD}/:resetToken`} ><ResetPassword /></Route>
                    <PrivateRoute exact path={paths.ADMIN} component={BoardAdmin} />
                    <PrivateRoute exact path={paths.CONTACT} component={Contact} />
                    <PrivateRoute exact path={paths.PROFILE} component={Profile} />
                    <PrivateRoute exact path={paths.RECIPES} component={Recipes} />
                    <PrivateRoute exact path={paths.RECIPE_DETAIL} component={RecipeDetail} />
                    <PrivateRoute exact path={paths.RECIPE_FORM} component={RecipeForm} />
                    <PrivateRoute path={paths.USER} component={BoardUser} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
        </AuthContext.Provider>
    );
}

export default App