import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import MainListPage from '../../routes/MainListPage/MainListPage';
import CompletedListPage from '../../routes/CompletedListPage/CompletedListPage';
import ArchivePage from '../../routes/ArchivePage/ArchivePage';
import DashboardPage from '../../routes/DashboardPage/DashboardPage';
import AccountPage from '../../routes/AccountPage/AccountPage';
import AddItemPage from '../../routes/AddItemPage/AddItemPage';
import NewTemplatePage from '../../routes/NewTemplatePage/NewTemplatePage';
import EmailPage from '../../routes/EmailPage/EmailPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <main className='App'>
        <Switch>
          {/* public routes */}
          <Route
            exact
            path={'/'}
            component={LandingPage}
          />
          <Route
            path={'/login'}
            component={LoginPage}
          />
          <Route
            path={'/register'}
            component={RegistrationPage}
          />

          {/* private routes */}
          <Route
            path={'/main'}
            component={MainListPage}
          />
          <Route
            path={'/completed'}
            component={CompletedListPage}
          />
          <Route
            path={'/archive'}
            component={ArchivePage}
          />
          <Route
            path={'/dashboard'}
            component={DashboardPage}
          />
          <Route
            path={'/account'}
            component={AccountPage}
          />
          <Route
            path={'/add-item'}
            component={AddItemPage}
          />
          <Route
            path={'/new-template'}
            component={NewTemplatePage}
          />
          <Route
            path={'/email'}
            component={EmailPage}
          />
          <Route
            component={NotFoundPage}
          />
        </Switch>
      </main>
    );
  }
}