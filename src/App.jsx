import React, { useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Container from 'react-bootstrap/Container'

import About from './components/views/About'
import AdminBoard from './components/views/AdminBoard'
import UserBoard from './components/views/UserBoard'
import Contact from './components/views/Contact'
import Header from './components/layout/Header'
import Home from './components/views/Home'
import Login from './components/views/connection/Login'
import LostPassword from './components/views/connection/LostPassword'
import NotFound from './components/layout/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Profile from './components/views/profile/Profile'

import Register from './components/views/connection/Register'
import ResetPassword from './components/views/connection/ResetPassword'

import { AuthContext } from './contexts/AuthContext.js'
import AuthService from './services/authService.js'
import paths from './constants/paths.json'
import authReducer from './reducers/authReducer'

const currentUserInit = {
   isAuthenticated: AuthService.isAuthenticated,
   user: AuthService.currentUser,
}

const App = () => {
   const [currentUser, userDispatch] = useReducer(authReducer, currentUserInit)

   return (
      <AuthContext.Provider
         value={{
            currentUser,
            userDispatch,
         }}
      >
         <Router basename="patachou">
            <Container className="p-0">
               <Header />
               <Switch>
                  <Route exact path="/">
                     <Home />
                  </Route>
                  <Route exact path={paths.ABOUT}>
                     <About />
                  </Route>
                  <Route exact path={paths.HOME}>
                     <Home />
                  </Route>
                  <Route exact path={paths.LOGIN}>
                     <Login />
                  </Route>
                  <Route exact path={paths.LOST_PASSWORD}>
                     <LostPassword />
                  </Route>
                  <Route exact path={paths.REGISTER}>
                     <Register />
                  </Route>
                  <Route exact path={`${paths.RESET_PASSWORD}/:resetToken`}>
                     <ResetPassword />
                  </Route>
                  <PrivateRoute exact path={paths.ADMIN_BOARD} component={AdminBoard} />
                  <PrivateRoute exact path={paths.USER_BOARD} component={UserBoard} />
                  <PrivateRoute exact path={paths.CONTACT} component={Contact} />
                  <PrivateRoute exact path={paths.PROFILE} component={Profile} />
                  <Route component={NotFound} />
               </Switch>
            </Container>
         </Router>
      </AuthContext.Provider>
   )
}

export default App
