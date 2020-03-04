import React from 'react';
import AppContext from '../../contexts/contexts'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import MainListItem from '../../components/MainListItem/MainListItem'
import ListService from '../../services/list-service';

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
            return (
            <div className={styles.instructions}>
                <p>Welcome to the coordinator tool! Here's how to get started:</p>
                <ol>
                    <li>Add your Project Manager names and emails in the <span className={styles.tabStyle}><i className="fas fa-user-circle"></i> Account</span> tab PM Settings section.</li>
                    <li>Create some email templates in the <span className={styles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</li>
                    <li>Add your first list item! Use the <span className={styles.addButtonStyle}>+ Add Item</span> button to start adding list items. You can include URL's for the contact or project page which will link the list item values to the external pages for quick navigation in the future.</li>
                    <li>Other tips:</li>
                        <ul>
                            <li>Use the <span className={styles.buttonStyle}>PM Update</span> button to automatically generate an email with all of your current list items categorized by PM. This can be used to send an update email to all of your PM's whenever you need to.</li>
                            <li>The <span className={styles.buttonStyle}>Reset</span> button can be used to reset the status of all of the list items back to no status. You can use this in the beginning of the day to mark all items as no longer pending from the previous day.</li>
                            <li>When you mark a list item completed, it will automatically get moved into the <span className={styles.tabStyle}><i className="fas fa-check-square"></i> Completed</span> tab where you can revert the status of any completed item if needed and move it back into your main list.</li>
                            <li>Use the <span className={styles.tabStyle}><i className="fas fa-chart-pie"></i> Dashboard</span> tab to keep track of metrics and gain insight into trends related to your workflow.</li>
                            <li>You can see these instructions any time by clicking on the "User Guide" button in the <span className={styles.tabStyle}><i className="fas fa-user-circle"></i> Account</span> tab.</li>
                        </ul>
                </ol>
            </div>
            )
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