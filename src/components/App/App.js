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
import EditItemPage from '../../routes/EditItemPage/EditItemPage'
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import UserDataService from '../../services/user-data-service';
import config from '../../config'
import data from '../../STORE';

import './App.css';
import AppContext from '../../contexts/contexts';

export default class App extends React.Component {
  state = {
    listItems: [],
    completedListItems: [],
    pms: [],
    user: [],
    templates: [],
    dateOptions: { month: 'short', day: 'numeric' },
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/list`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => res.json())
          .then(resJson => this.setState({ listItems: resJson }))
          
    fetch(`${config.API_ENDPOINT}/pms`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => res.json())
          .then(resJson => this.setState({ pms: resJson }))

    fetch(`${config.API_ENDPOINT}/templates`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => res.json())
          .then(resJson => this.setState({ templates: resJson }))

    fetch(`${config.API_ENDPOINT}/completed`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => res.json())
          .then(resJson => this.setState({ completedListItems: resJson }))

    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => res.json())
          .then(resJson => this.setState({ user: resJson[0] }))
  }

  

  render() {
    
    const { listItems, pms, user, templates, completedListItems, dateOptions } = this.state;

    const value = {
      listItems,
      pms,
      user,
      templates,
      completedListItems,
      dateOptions,
    }

    return (
      
      <AppContext.Provider value={value}>
        <main className='App'>
          <Switch>
            {/* public routes */}
            <PublicOnlyRoute
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
            <PrivateRoute
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
              path={'/edit-item'}
              component={EditItemPage}
            />
            <PrivateRoute
              path={'/new-template'}
              component={NewTemplatePage}
            />
            <PrivateRoute
              path={'/email'}
              component={EmailPage}
            />
            <PrivateRoute
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </AppContext.Provider>
      
    );
  }
}