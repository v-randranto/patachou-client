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
import Login from './components/views/connection/Login'
import LostPassword from './components/views/connection/LostPassword'
import NotFound from './components/layout/NotFound'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './components/views/profile/Profile'
import Recipes from './components/views/recipes/Recipes.jsx'
import RecipeDetail from './components/views/recipes/RecipeDetail.jsx'
import Register from './components/views/connection/Register'


import { AuthContext } from "./contexts/AuthContext.js";
import AuthService from "./components/services/authService.js";
import { ABOUT, ADMIN, CONTACT, HOME, LOGIN, LOST_PASSWORD, PROFILE, RECIPES, RECIPE_DETAIL, REGISTER, USER} from './constants/paths'

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
                    <Route exact path="/" component={Home} />
                    <Route exact path={ABOUT} component={About} />
                    <Route exact path={HOME} component={Home} />
                    <Route exact path={LOGIN} component={Login} />
                    <Route exact path={LOST_PASSWORD} component={LostPassword} />
                    <Route exact path={REGISTER} component={Register} />
                    <PrivateRoute path={ADMIN} component={BoardAdmin} />
                    <PrivateRoute exact path={CONTACT} component={Contact} />
                    <PrivateRoute exact path={PROFILE} component={Profile} />
                    <PrivateRoute exact path={RECIPES} component={Recipes} />
                    <PrivateRoute exact path={RECIPE_DETAIL} component={RecipeDetail} />
                    <PrivateRoute path={USER} component={BoardUser} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
        </AuthContext.Provider>
    );
}

export default App