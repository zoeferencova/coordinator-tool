import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';

import styles from './UnauthenticatedApp.module.css';

export default class UnauthenticatedApp extends Component {

  render() {
    return ( 
        <main className='App'>
          <Switch>
            <Route exact path={'/'} component={LandingPage} />
            <Route path={'/login'} component={() => <LoginPage setLoggedIn={this.props.setLoggedIn} />} />
            <Route path={'/register'} component={RegistrationPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
    );
  }
}