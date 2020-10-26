import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Header from './components/layout/Header';
import Notfound from './components/layout/Notfound';
import Home from './components/views/Home';
import About from './components/views/About';
import Contact from './components/views/Contact';
import Login from './components/views/Login';
import Register from './components/views/Register';
import Profile from './components/views/Profile';
import LostPassword from './components/views/LostPassword';

function App() {
  return (
    <Router>
      <Container className="p-0">
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <Contact />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
          <Route exact path="/lost-password">
            <LostPassword/>
          </Route>
          <Route>
            <Notfound />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
