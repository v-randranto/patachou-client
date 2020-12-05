/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Container from 'react-bootstrap/Container'
import Header from './components/layout/Header'
import NotFound from './components/layout/NotFound'
import Home from './components/views/Home'
import About from './components/views/About'
import Contact from './components/views/Contact'
import Login from './components/views/Login'
import Register from './components/views/Register'
import Profile from './components/views/Profile'
import LostPassword from './components/views/LostPassword'
import PrivateRoute from './components/PrivateRoute.jsx'

import BoardUser from "./components/views/BoardUser";
import BoardAdmin from "./components/views/BoardAdmin";

import { ABOUT, ADMIN, CONTACT, HOME, LOGIN, LOST_PASSWORD, PROFILE, REGISTER, USER} from './constants/paths'

const App: React.FC = () => {
    return (
        <Router>
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
                    <PrivateRoute path={USER} component={BoardUser} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App