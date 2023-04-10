import React, { useState } from 'react';
import UnauthenticatedApp from '../UnauthenticatedApp/UnauthenticatedApp';
import AuthenticatedApp from '../AuthenticatedApp/AuthenticatedApp';
import TokenService from '../../services/token-service';

import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState([TokenService.hasAuthToken()])

  return (
    <main className='App'>
      {(TokenService.hasAuthToken() && isLoggedIn) ? <AuthenticatedApp setLoggedIn={setLoggedIn} /> : <UnauthenticatedApp setLoggedIn={setLoggedIn} />}
    </main>
  );
}

export default App;