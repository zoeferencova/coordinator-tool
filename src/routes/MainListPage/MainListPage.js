import React from 'react';
import AppContext from '../../contexts/contexts'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import MainListItem from '../../components/MainListItem/MainListItem'

import tableStyles from '../../components/Utils/shared-styles/TableStyles.module.css'
// import styles from './MainListPage.module.css'

export default class MainListPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        emailFormOpen: false,
        emailProject: '',
        emailAdvisor: '',
        emailPmName: '',
        query: '',
        sort: 'date-asc',
        checkedItems: []
    }

    openEmailForm = (project, advisor, pm_name, pm_email) => {
        const fixedproj = project.replace('&', 'and')
        this.setState({ emailFormOpen: true })
        this.setState({
            emailProject: fixedproj,
            emailAdvisor: advisor,
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
            emailAdvisor: '',
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

    sortItems = (inputItems, sort) => {
        const ASC = 'ascending';
        const DSC = 'descending';

        const sortByAdvisor = (a, b, order=ASC) => {
            const diff = a.props.advisor.toLowerCase().localeCompare(b.props.advisor.toLowerCase());
            return order === ASC ? diff : -1 * diff
        } 
        const sortByProject = (a, b, order=ASC) => {
            const diff = a.props.project.toLowerCase().localeCompare(b.props.project.toLowerCase());
            return order === ASC ? diff : -1 * diff
        }
        const sortByPM = (a, b, order=ASC) => {
            const diff = a.props.pm_name.toLowerCase().localeCompare(b.props.pm_name.toLowerCase());
            return order === ASC ? diff : -1 * diff
        } 
        const sortByDate = (a, b, order=ASC) => {
            const diff = new Date(a.props.unformatted_date) - new Date(b.props.unformatted_date);
            return order === ASC ? diff : -1 * diff
        };
        const sortByStatus = (a, b, order=ASC) => {
            const diff = a.props.status.toLowerCase().localeCompare(b.props.status.toLowerCase());
            return order === ASC ? diff : -1 * diff
        } 
                
        if (sort === 'advisor-asc') {
            return inputItems.sort((a, b) => sortByAdvisor(a, b, ASC))
        } else if (sort === 'advisor-desc') {
            return inputItems.sort((a, b) => sortByAdvisor(a, b, DSC))
        } else if (sort === 'project-asc') {
            return inputItems.sort((a, b) => sortByProject(a, b, ASC))
        } else if (sort === 'project-desc') {
            return inputItems.sort((a, b) => sortByProject(a, b, DSC))
        } else if (sort === 'pm-asc') {
            return inputItems.sort((a, b) => sortByPM(a, b, ASC))
        } else if (sort === 'pm-desc') {
            return inputItems.sort((a, b) => sortByPM(a, b, DSC))
        } else if (sort === 'date-asc') {
            return inputItems.sort((a, b) => sortByDate(a, b, ASC))
        } else if (sort === 'date-desc') {
            return inputItems.sort((a, b) => sortByDate(a, b, DSC))
        } else if (sort === 'status-asc') {
            return inputItems.sort((a, b) => sortByStatus(a, b, ASC))
        } else if (sort === 'status-desc') {
            return inputItems.sort((a, b) => sortByStatus(a, b, DSC))
        }
    }
    
    searchItems = (inputItems, query) => {
        let items;
        if (query !== '') {
            items = inputItems.filter(item => item.props.advisor.toLowerCase().includes(query) || item.props.project.toLowerCase().includes(query))
        } else if (query === '') {
            items = inputItems
        }
        return items;
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
                advisor={item.advisor}
                advisor_url={item.advisor_url}
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
        const searchedItems = this.searchItems(itemArray, query)
        if (sort === 'none') {
            return searchedItems;
        } else {
            return this.sortItems(searchedItems, sort)
        }
    }

    renderNoItemMessage = () => {
        const nonCompletedItems = this.context.listItems.filter(item => item.status !== 'completed')
        return nonCompletedItems.length === 0 ? <p>You have no items to do! :)</p> : ''
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
                            {this.renderNoItemMessage()}
                        </div>
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} advisor={this.state.emailAdvisor} pm_name={this.state.emailPmName} closeEmailForm={this.closeEmailForm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}