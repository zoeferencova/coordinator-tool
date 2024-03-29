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
import NavBar from '../../components/NavBar/NavBar'
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import OnboardingModal from '../../components/OnboardingModal/OnboardingModal';
import UserDataService from '../../services/user-data-service';
import ListService from '../../services/list-service';
import AppContext from '../../contexts/contexts';
import DashboardService from '../../services/dashboard-service';

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
      dashboardData: [],
      loading: true,
      navOpen: false,
      onboarding: false
    }
  }


  componentDidMount() {
    UserDataService.getUserData()
      .then(res => this.setUserData(res))

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
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

    if (data[1].length === 0) this.openOnboarding()
  }

  setDashboardData = data => {
    this.setState({ dashboardData: data })
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

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
  }

  addItemById = itemId => {
    const item = this.state.listItems.find(item => item.id === itemId)
    this.setState({ listItems: [...this.state.listItems, item] })

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
  }

  deleteItem = itemId => {
    const newItems = this.state.listItems.filter(listItem => +listItem.id !== +itemId)
    this.setState({ listItems: newItems })

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
  }

  updateItem = (updatedItem) => {
    const newItems = this.state.listItems.map(item =>
      (item.id === updatedItem.id)
        ? updatedItem
        : item
    )
    this.setState({ listItems: newItems })

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
  }

  updateDateCompleted = (updatedItem, date) => {
    const { contact, project, id } = updatedItem;
    const foundPm = this.state.pms.find(pm => pm.pm_email === updatedItem.pm_email);
    const pmId = foundPm.id;
    ListService.updateDateCompleted(id, date, contact, project, pmId);
  }

  updateItemStatus = (updatedItemId, status) => {
    let item;
    item = this.state.listItems.find(item => item.id === updatedItemId)
    if (item === undefined) item = this.state.completedListItems.find(item => item.id === updatedItemId)
    const oldStatus = item.status;
    item.status = status;

    if (oldStatus === 'completed') {
      this.setState({ listItems: [item, ...this.state.listItems] })
      const newCompletedItems = this.state.completedListItems.filter(item => item.id !== updatedItemId);
      this.setState({ completedListItems: newCompletedItems })
    } else {
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

    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
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
    const pmToRemove = this.state.pms.find(pm => +pm.id === +pmId)
    const newPms = this.state.pms.filter(pm => +pm.id !== +pmId)
    this.setState({ pms: newPms })
    this.setState({ listItems: this.state.listItems.filter(item => item.pm_email !== pmToRemove.pm_email) })
    this.setState({ completedListItems: this.state.completedListItems.filter(item => item.pm_email !== pmToRemove.pm_email) })
    DashboardService.getDashboardData()
      .then(res => this.setDashboardData(res))
  }

  setNavOpen = bool => this.setState({ navOpen: bool })

  closeOnboarding = () => this.setState({ onboarding: false })
  openOnboarding = () => this.setState({ onboarding: true })

  //Setting context values using AuthenticatedApp's states, providing those context values to all children
  render() {
    return (
      <AppContext.Provider value={{ ...this.state }}>
        <main>
          <NavBar navOpen={this.state.navOpen} setNavOpen={this.setNavOpen} />
          <MobileHeader navOpen={this.state.navOpen} setNavOpen={this.setNavOpen} />
          {this.state.onboarding && <OnboardingModal onaboarding={this.onaboarding} closeOnboarding={this.closeOnboarding} />}
          <Routes>
            <Route path={'/main'} element={<MainListPage />} />
            <Route path={'/completed'} element={<CompletedListPage />} />
            <Route path={'/dashboard'} element={<DashboardPage />} />
            <Route path={'/account'} element={<AccountPage openOnboarding={this.openOnboarding} onboarding={this.state.onboarding} />} />
            <Route path={'/add-item'} element={<AddItemPage onboarding={this.state.onboarding} />} />
            <Route path={`/edit-item/:id`} element={<EditItemPage />} />
            <Route path={'/new-template'} element={<NewTemplatePage onboarding={this.state.onboarding} />} />
            <Route path={'/templates'} element={<TemplatePage />} />
            <Route element={<NotFoundPage />} />
          </Routes>
        </main>
      </AppContext.Provider>

    );
  }
}