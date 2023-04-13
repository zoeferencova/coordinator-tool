import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';

const UnauthenticatedApp = ({ setLoggedIn }) => (
  <main className='App'>
    <Routes>
      <Route exact path={'/'} element={<LandingPage setLoggedIn={setLoggedIn} />} />
      <Route path={'/login'} element={<LoginPage setLoggedIn={setLoggedIn} />} />
      <Route path={'/register'} element={<RegistrationPage />} />
      <Route element={NotFoundPage} />
    </Routes>
  </main>
)

export default UnauthenticatedApp;