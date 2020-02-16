import React from 'react';
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
      fetchData: this.fetchData,
      deleteItem: this.deleteItem,
      addItem: this.addItem,
      addItemById: this.addItemById,
      updateItem: this.updateItem,
      updateItemStatus: this.updateItemStatus,
      addTemplate: this.addTemplate,
      deleteTemplate: this.deleteTemplate,
      updateTemplate: this.updateTemplate,
      addPm: this.addPm,
      deletePm: this.deletePm,
      revertCompleted: this.revertCompleted,
      setListItems: this.setListItems,
      setCompletedItems: this.setCompletedItems,
      setPms: this.setPms,
      setTemplates: this.setTemplates,
      setUser: this.setUser,
      setInitialState: this.setInitialState,
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    fetch(`${config.API_ENDPOINT}/pms`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
          .then(resJson => this.setPms(resJson))
  

    fetch(`${config.API_ENDPOINT}/users`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
        }
        })
            .then(res => 
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
            .then(resJson => this.setUser(resJson))

    fetch(`${config.API_ENDPOINT}/templates`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
          .then(resJson => this.setTemplates(resJson))


    fetch(`${config.API_ENDPOINT}/list`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      }
      })
          .then(res => 
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
          .then(resJson => this.setListItems(resJson))
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
    this.setState({ templates: templates })
  }

  setPms = (pms) => {
    this.setState({ pms })
  }
  
  deleteItem = (itemId) => {
    const newItems = this.state.listItems.filter(listItem => Number(listItem.id) !== Number(itemId))
    this.setState({ listItems: newItems })
  }

  addItem = (item) => {
    this.setState({ listItems: [...this.state.listItems, item] })
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

  addTemplate = template => {
    this.setState({ templates: [...this.state.templates, template] })
  }

  deleteTemplate = templateId => {
    const newTemplates = this.state.templates.filter(template => Number(template.id) !== Number(templateId))
    this.setState({ templates: newTemplates })
  }

  updateTemplate = (updatedTemplate) => {
    console.log(updatedTemplate)
    const newTemplates = this.state.templates.map(template => 
      (template.id === updatedTemplate.id)
        ? updatedTemplate
        : template 
    )
    this.setState({ templates: newTemplates })
  }

  updateDateCompleted = (updatedItem, date) => {
    const { advisor, project } = updatedItem;
    const foundPm = this.state.pms.find(pm => pm.pm_email === updatedItem.pm_email);
    const pmId = foundPm.id;
    fetch(`${config.API_ENDPOINT}/list/${updatedItem.id}`, {
      method: 'PATCH',
      headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
      },
      body: JSON.stringify({ date_completed: new Date(date), advisor, project, pm_id: pmId })
    })
  }

  updateItemStatus = (updatedItemId, status) => {
    const item = this.state.listItems.find(item => item.id === updatedItemId)
    item.status = status;
    if(status === 'completed') {
      const newItems = this.state.listItems.filter(item => item.id !== updatedItemId)
      this.setState({ listItems: newItems })
      this.updateDateCompleted(item, Date.now())
    }
    this.setState({ listItems: this.state.listItems })
  }

  addPm = pm => {
    this.setState({ pms: [...this.state.pms, pm] })
  }

  deletePm = pmId => {
    const newPms = this.state.pms.filter(pm => Number(pm.id) !== Number(pmId))
    this.setState({ pms: newPms })
  }

  revertCompleted = (itemId) => {
    const item = this.state.completedListItems.find(item => item.id === itemId)
    const newCompleted = this.state.completedListItems.filter(item => item.id !== itemId)
    this.setState({ completedListItems: newCompleted })
    item.status = 'none'
    this.addItem(item)
  }

  addItemById = (itemId) => {
    const item = this.state.listItems.find(item => item.id === itemId)
    this.setState({ listItems: [...this.state.listItems, item] })
  }

  render() {
    const { listItems, pms, user, templates, completedListItems, dateOptions, fetchData, deleteItem, addItem, addItemById, updateItem, updateItemStatus, addTemplate, deleteTemplate, updateTemplate, addPm, deletePm, revertCompleted, setListItems, setCompletedItems, setPms, setTemplates, setUser, setInitialState } = this.state;
    const value = { listItems, pms, user, templates, completedListItems, dateOptions, fetchData, deleteItem, addItem, addItemById, updateItem, updateItemStatus, addTemplate, deleteTemplate, updateTemplate, addPm, deletePm, revertCompleted, setListItems, setCompletedItems, setPms, setTemplates, setUser, setInitialState }

    return ( 
      <AppContext.Provider value={value}>
        <main className='App'>
          {this.state.hasError && <p>There was an error!</p>}
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