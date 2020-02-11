import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router-dom';
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
import config from '../../config'

import './App.css';
import AppContext from '../../contexts/contexts';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listItems: [],
      completedListItems: [],
      pms: [],
      user: [],
      templates: [],
      dateOptions: { month: 'short', day: 'numeric' },
      deleteItem: this.deleteItem,
      addItem: this.addItem,
      updateItem: this.updateItem,
      updateItemStatus: this.updateItemStatus,
      revertCompleted: this.revertCompleted,
      setListItems: this.setListItems,
      setCompletedItems: this.setCompletedItems,
      setPms: this.setPms,
      setTemplates: this.setTemplates,
      setUser: this.setUser,
      setInitialState: this.setInitialState,
    }
  }

  setInitialState = () => {
    this.setState({
      listItems: [],
      completedListItems: [],
      pms: [],
      user: [],
      templates: [],
    })
  }

  setListItems = (items) => {
    this.setState({ listItems: items })
  }

  setCompletedItems = (items) => {
    this.setState({ completedListItems: items })
  }

  setUser = (data) => {
    this.setState({ user: data })
  }

  setTemplates = (templates) => {
    this.setState({ templates })
  }

  setPms = (pms) => {
    this.setState({ pms })
  }
  
  deleteItem = (itemId) => {
    const newItems = this.state.listItems.filter(listItem => Number(listItem.id) !== Number(itemId))
    this.setState({ listItems: newItems })
  }

  addItem = (item) => {
    this.setState({ listItems: [item, ...this.state.listItems] })
  }

  updateItem = (updatedItem) => {
    const newItems = this.state.listItems.map(item => 
      (item.id === updatedItem.id)
        ? updatedItem
        : item 
    )
    console.log(updatedItem)
    this.setState({ listItems: newItems })
  }

  updateItemStatus = (updatedItemId, status) => {
    const item = this.state.listItems.find(item => item.id === updatedItemId)
    item.status = status;
    if(status === 'completed') {
      const newItems = this.state.listItems.filter(item => item.id !== updatedItemId)
      this.setState({ listItems: newItems })
    }
    this.setState({ listItems: this.state.listItems })
  }

  revertCompleted = (itemId) => {
    const newCompleted = this.state.completedListItems.filter(item => item.id !== itemId)
    this.setState({ completedListItems: newCompleted })
  }

  render() {
    const { listItems, pms, user, templates, completedListItems, dateOptions, deleteItem, addItem, updateItem, updateItemStatus, revertCompleted, setListItems, setCompletedItems, setPms, setTemplates, setUser, setInitialState } = this.state;
    const value = { listItems, pms, user, templates, completedListItems, dateOptions, deleteItem, addItem, updateItem, updateItemStatus, revertCompleted, setListItems, setCompletedItems, setPms, setTemplates, setUser, setInitialState }

    return ( 
      <AppContext.Provider value={value}>
        <main className='App'>
          <Switch>
            {/* public routes */}
            <PublicOnlyRoute exact path={'/'} component={LandingPage} />

            <PublicOnlyRoute path={'/login'} component={LoginPage} />
            
            <PublicOnlyRoute path={'/register'} component={RegistrationPage} />

            <PrivateRoute path={'/main'} component={MainListPage} />
            
            <PrivateRoute path={'/completed'} component={CompletedListPage} />
            
            <PrivateRoute path={'/dashboard'} component={DashboardPage} />
            
            <PrivateRoute path={'/account'} component={AccountPage} />
            
            <PrivateRoute path={'/add-item'} component={AddItemPage} />
            
            <PrivateRoute path={`/edit-item/:id`} component={EditItemPage} />
            
            <PrivateRoute path={'/new-template'} component={NewTemplatePage} />
            
            <PrivateRoute path={'/email'} component={EmailPage} />
            
            <PrivateRoute component={NotFoundPage} />

          </Switch>
        </main>
      </AppContext.Provider>
      
    );
  }
}