import React, { Component } from 'react';
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp';
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp';
import TokenService from '../../services/token-service';

import './App.css';

export default class App extends Component {
  state = {
      isLoggedIn: TokenService.hasAuthToken() ? true : false,
  }

  //Passed as a prop to AuthenticatedApp and UnauthenticatedApp
  //Sets isLoggedIn state to true or false which conditionally renders the Authenticated and Unauthenticated App components based on whether an Auth Token is present
  setLoggedIn = (status) =>  {
    this.setState({ isLoggedIn: status })
  }

  render() {
    return ( 
        <main className='App'>
          {(TokenService.hasAuthToken() && this.state.isLoggedIn) ? <AuthenticatedApp setLoggedIn={this.setLoggedIn} /> : <UnauthenticatedApp setLoggedIn={this.setLoggedIn} />}
        </main>
    );
  }
}