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

const App: React.FC = () => {
    return (
        <Router>
            <Container className="p-0">
                <Header />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/lost-password" component={LostPassword} />
                    <PrivateRoute exact path="/contact" component={Contact} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </Router>
    );
}

export default App