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
import UserDataService from '../../services/user-data-service';
import data from '../../STORE';

import './App.css';
import AppContext from '../../contexts/contexts';

export default class App extends React.Component {
  state = {
    listItems: [],
    completedListItems: [],
    pms: [],
    user: {},
    templates: [],
    dateOptions: {},
  }

  componentDidMount() {
    this.setState({
      listItems: data.listItems,
      completedListItems: data.completedListItems,
      pms: data.pms,
      user: data.user,
      templates: data.templates,
      dateOptions: data.dateOptions,
    });
  }

  // componentDidMount() {
  //     UserDataService.getUserData()
  //         .then(res => this.setState({ listItems: res }))
  // }

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
            <PublicOnlyRoute
              path={'/completed'}
              component={CompletedListPage}
            />
            <PublicOnlyRoute
              path={'/dashboard'}
              component={DashboardPage}
            />
            <PublicOnlyRoute
              path={'/account'}
              component={AccountPage}
            />
            <PublicOnlyRoute
              path={'/add-item'}
              component={AddItemPage}
            />
            <PublicOnlyRoute
              path={'/new-template'}
              component={NewTemplatePage}
            />
            <PublicOnlyRoute
              path={'/email'}
              component={EmailPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </AppContext.Provider>
      
    );
  }
}