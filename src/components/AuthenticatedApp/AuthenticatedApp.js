import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainListPage from '../../routes/MainListPage/MainListPage';
import CompletedListPage from '../../routes/CompletedListPage/CompletedListPage';
import DashboardPage from '../../routes/DashboardPage/DashboardPage';
import AccountPage from '../../routes/AccountPage/AccountPage';
import AddItemPage from '../../routes/AddItemPage/AddItemPage';
import NewTemplatePage from '../../routes/NewTemplatePage/NewTemplatePage';
import TemplatePage from '../../routes/TemplatePage/TemplatePage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import EditItemPage from '../../routes/EditItemPage/EditItemPage'
import UserDataService from '../../services/user-data-service';
import ListService from '../../services/list-service';
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
    UserDataService.getUserData()
      .then(res => this.setUserData(res))
  }

  setUserData = data => {
    this.setState({
      listItems: data[0],
      pms: data[1],
      templates: data[2],
      completedListItems: data[3],
      user: data[4],
      loading: false
    })
  }

  //Clears all values in state - used when the user logs out
  setInitialState = () => {
    this.setState({
      listItems: [],
      completedListItems: [],
      pms: [],
      user: [],
      templates: [],
    })
  }

  //Functions for adding, deleting and updating data in state/context
  //Used through context in child components to update values after fetch calls
  addItem = item => {
    this.setState({ listItems: [...this.state.listItems, item] })
  }

  addItemById = itemId => {
    const item = this.state.listItems.find(item => item.id === itemId)
    this.setState({ listItems: [...this.state.listItems, item] })
  }

  deleteItem = itemId => {
    const newItems = this.state.listItems.filter(listItem => +listItem.id !== +itemId)
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
    const { contact, project, id } = updatedItem;
    const foundPm = this.state.pms.find(pm => pm.pm_email === updatedItem.pm_email);
    const pmId = foundPm.id;
    ListService.updateDateCompleted(id, date, contact, project, pmId);
  }

  updateItemStatus = (updatedItemId, status) => {
    const item = this.state.listItems.find(item => item.id === updatedItemId)
    item.status = status;

    if (status === 'completed') {
      const newItems = this.state.listItems.filter(item => item.id !== updatedItemId)
      this.setState({ listItems: newItems })
      item.date_completed = Date.now();
      this.setState({ completedListItems: [item, ...this.state.completedListItems] })
      this.updateDateCompleted(item, Date.now())
    } else {
      this.setState({ listItems: this.state.listItems })
    }
  }

  revertCompleted = itemId => {
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

  //Setting context values using AuthenticatedApp's states, providing those context values to all children
  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        <main>
          <Routes>
            <Route path={'/main'} element={<MainListPage />} />
            <Route path={'/completed'} element={<CompletedListPage />} />
            <Route path={'/dashboard'} element={<DashboardPage />} />
            <Route path={'/account'} element={<AccountPage />} />
            <Route path={'/add-item'} element={<AddItemPage />} />
            <Route path={`/edit-item/:id`} element={<EditItemPage />} />
            <Route path={'/new-template'} element={<NewTemplatePage />} />
            <Route path={'/templates'} element={<TemplatePage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </main>
      </AppContext.Provider>

    );
  }
}