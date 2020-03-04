import React from 'react';
import AppContext from '../../contexts/contexts'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import MainListItem from '../../components/MainListItem/MainListItem'
import ListService from '../../services/list-service';
import { UserGuide } from '../../components/Utils/Utils'

import tableStyles from '../../components/Utils/shared-styles/TableStyles.module.css'
import styles from './MainListPage.module.css'

export default class MainListPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        emailFormOpen: false,
        emailProject: '',
        emailContact: '',
        emailPmName: '',
        query: '',
        sort: 'date-asc',
        checkedItems: []
    }

    openEmailForm = (project, contact, pm_name, pm_email) => {
        const fixedproj = project.replace('&', 'and')
        this.setState({ emailFormOpen: true })
        this.setState({
            emailProject: fixedproj,
            emailContact: contact,
            emailPmName: pm_name,
            emailPmEmail: pm_email
        })
    }

    setQuery = (query) => {
        this.setState({ query })
    }

    setSort = (sort) => {
        this.setState({ sort })
    }

    closeEmailForm = () => {
        this.setState({
            emailFormOpen: false,
            emailProject: '',
            emailContact: '',
            emailPmName: '',
        })
    }

    setChecked = (id) => {
        if (this.state.checkedItems.includes(id)) {
            const newItems = this.state.checkedItems.filter(item => item !== id)
            this.setState({ checkedItems: newItems })
        } else if (typeof(id) !== 'object') {
            this.setState({ checkedItems: [...this.state.checkedItems, id] })
        } else if (typeof(id) === 'object') {
            this.setState({ checkedItems: id })
        }
    }

    clearChecked = () => {
        this.setState({ checkedItems: [] })
        const listCheckboxes = document.querySelectorAll('#list-checkbox')
        const headerCheckbox = document.querySelector('#header-checkbox')
        listCheckboxes.forEach(item => item.checked = false)
        headerCheckbox.checked = false;
    }

    renderListItems = () => { 
        const { sort, query } = this.state;
        const { listItems } = this.context;
        const itemArray = listItems.map(item => 
            <MainListItem
                key={item.id}
                id={item.id}
                checked={item.checked}
                status={item.status}
                project={item.project}
                project_url={item.project_url}
                contact={item.contact}
                contact_url={item.contact_url}
                pm_name={item.pm_name}
                pm_email={item.pm_email}
                date_created={new Date(item.date_created).toLocaleDateString('en-US', this.context.dateOptions)}
                unformatted_date={item.date_created}
                notes={item.notes}
                openEmailForm={this.openEmailForm}
                closeEmailForm={e => this.closeEmailForm}
                setChecked={this.setChecked}
                
            />
        )
        const searchedItems = ListService.searchItems(itemArray, query)
        if (sort === 'none') {
            return searchedItems;
        } else {
            return ListService.sortItems(searchedItems, sort)
        }
    }

    renderNoItemMessage = () => {
        const nonCompletedItems = this.context.listItems.filter(item => item.status !== 'completed')
        if (nonCompletedItems.length === 0 && this.context.completedListItems.length > 0) {
            return <p>You have no items to do! <i class="far fa-smile"></i></p>
        } else if (nonCompletedItems.length === 0 && this.context.completedListItems.length === 0) {
            return <UserGuide />
        }
    }

    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        const title = new Date().toLocaleDateString("en-US", dateOptions)

        return (
            <div className="container">
                <main className="content">
                    <Header title={title} />
                    <div className={tableStyles.listContainer}>
                        <MainListTools setQuery={this.setQuery} checkedItems={this.state.checkedItems} clearChecked={this.clearChecked} />
                        <div>
                            <MainListBody setSort={this.setSort} currentSort={this.state.sort} renderListItems={this.renderListItems} openEmailForm={this.openEmailForm} closeEmailForm={this.closeEmailForm} setChecked={this.setChecked} clearChecked={this.clearChecked} />
                            {this.context.loading && <img src={require('../../images/loader.gif')} alt="loader" className={styles.loader}></img>}
                            {!this.context.loading && this.renderNoItemMessage()}
                        </div>
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} contact={this.state.emailContact} pm_name={this.state.emailPmName} closeEmailForm={this.closeEmailForm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}