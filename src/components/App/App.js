import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from '../../routes/LandingPage/LandingPage';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import MainListPage from '../../routes/MainListPage/MainListPage';
import CompletedListPage from '../../routes/CompletedListPage/CompletedListPage';
import DashboardPage from '../../routes/DashboardPage/DashboardPage';
import AccountPage from '../../routes/AccountPage/AccountPage';
import AddItemPage from '../../routes/AddItemPage/AddItemPage';
import NewTemplatePage from '../../routes/NewTemplatePage/NewTemplatePage';
import EmailPage from '../../routes/EmailPage/EmailPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
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
          <PublicOnlyRoute
            path={'/login'}
            component={LoginPage}
          />
          <PublicOnlyRoute
            path={'/register'}
            component={RegistrationPage}
          />

          {/* private routes */}
          <PublicOnlyRoute
            path={'/main'}
            component={MainListPage}
          />
          <PrivateRoute
            path={'/completed'}
            component={CompletedListPage}
          />
          <PrivateRoute
            path={'/dashboard'}
            component={DashboardPage}
          />
          <PrivateRoute
            path={'/account'}
            component={AccountPage}
          />
          <PrivateRoute
            path={'/add-item'}
            component={AddItemPage}
          />
          <PrivateRoute
            path={'/new-template'}
            component={NewTemplatePage}
          />
          <PrivateRoute
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