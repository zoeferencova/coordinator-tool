import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainListPage from '../../routes/MainListPage/MainListPage';
import CompletedListPage from '../../routes/CompletedListPage/CompletedListPage';
import DashboardPage from '../../routes/DashboardPage/DashboardPage';
import AccountPage from '../../routes/AccountPage/AccountPage';
import AddItemPage from '../../routes/AddItemPage/AddItemPage';
import NewTemplatePage from '../../routes/NewTemplatePage/NewTemplatePage';
import EmailPage from '../../routes/EmailPage/EmailPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import EditItemPage from '../../routes/EditItemPage/EditItemPage'
import config from '../../config'

// import styles from './AuthenticatedApp.module.css';
import AppContext from '../../contexts/contexts';

export default class AuthenticatedApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listItems: [],
            completedListItems: [],
            pms: [],
            user: [],
            templates: [],
            data: { pm_data: [], timespan_data: [], time_completed_data: [] },  
            dateOptions: { month: 'short', day: 'numeric' },
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
            setInitialState: this.setInitialState,
            setLoggedIn: this.props.setLoggedIn,
            loading: true
        }
    }  


  componentDidMount() {
    this.fetchUserData()
  }

  fetchUserData() {
    fetch(`${config.API_ENDPOINT}/user-data`, {
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
          .then(resJson => this.setUserData(resJson))
  }

  setUserData = data => {
    this.setState({ listItems: data[0] })
    this.setState({ pms: data[1] })
    this.setState({ templates: data[2] })
    this.setState({ completedListItems: data[3] })
    this.setState({ user: data[4] })
    this.setState({ loading: false })
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

  addItem = (item) => {
    this.setState({ listItems: [...this.state.listItems, item] })
  }

  addItemById = (itemId) => {
    const item = this.state.listItems.find(item => item.id === itemId)
    this.setState({ listItems: [...this.state.listItems, item] })
  }
  
  deleteItem = (itemId) => {
    const newItems = this.state.listItems.filter(listItem => Number(listItem.id) !== Number(itemId))
    this.setState({ listItems: newItems })
  }

  updateItem = (updatedItem) => {
    const newItems = this.state.listItems.map(item => 
      (item.id === updatedItem.id)
        ? updatedItem
        : item 
    )
    this.setState({ listItems: newItems })
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
      item.date_completed = Date.now()
      this.setState({ completedListItems: [item, ...this.state.completedListItems] })
      this.updateDateCompleted(item, Date.now())
    }
    this.setState({ listItems: this.state.listItems })
  }

  revertCompleted = (itemId) => {
    const item = this.state.completedListItems.find(item => item.id === itemId)
    const newCompleted = this.state.completedListItems.filter(item => item.id !== itemId)
    this.setState({ completedListItems: newCompleted })
    item.status = 'none'
    this.addItem(item)
  }

  addTemplate = template => {
    this.setState({ templates: [...this.state.templates, template] })
  }

  deleteTemplate = templateId => {
    const newTemplates = this.state.templates.filter(template => Number(template.id) !== Number(templateId))
    this.setState({ templates: newTemplates })
  }

  updateTemplate = (updatedTemplate) => {
    const newTemplates = this.state.templates.map(template => 
      (template.id === updatedTemplate.id)
        ? updatedTemplate
        : template 
    )
    this.setState({ templates: newTemplates })
  }

  addPm = pm => {
    this.setState({ pms: [...this.state.pms, pm] })
  }

  deletePm = pmId => {
    const newPms = this.state.pms.filter(pm => Number(pm.id) !== Number(pmId))
    this.setState({ pms: newPms })
  }

  render() {
    const value = { ...this.state }

    return ( 
      <AppContext.Provider value={value}>
        <main>
          <Switch>
            <Route path={'/main'} component={MainListPage} />
            <Route path={'/completed'} component={CompletedListPage} />
            <Route path={'/dashboard'} component={DashboardPage} />
            <Route path={'/account'} component={AccountPage} />
            <Route path={'/add-item'} component={AddItemPage} />
            <Route path={`/edit-item/:id`} component={EditItemPage} />
            <Route path={'/new-template'} component={NewTemplatePage} />
            <Route path={'/email'} component={EmailPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </AppContext.Provider>
      
    );
  }
}