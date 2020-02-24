import React from 'react';
import AppContext from '../../contexts/contexts'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import MainListItem from '../../components/MainListItem/MainListItem'

import styles from './MainListPage.module.css'

export default class MainListPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        emailFormOpen: false,
        emailProject: '',
        emailAdvisor: '',
        emailPmName: '',
        query: '',
        sort: 'none',
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

        const sortByAdvisor = (a, b) => a.props.advisor.toLowerCase().localeCompare(b.props.advisor.toLowerCase());
        const sortByProject = (a, b) => a.props.project.toLowerCase().localeCompare(b.props.project.toLowerCase());
        const sortByPM = (a, b) => a.props.pm_name.toLowerCase().localeCompare(b.props.pm_name.toLowerCase());
        const sortByDate = (a, b, order=ASC) => {
            const diff = new Date(a.props.unformatted_date) - new Date(b.props.unformatted_date);
            return order === ASC ? diff : -1 * diff
        };
        const sortByStatus = (a, b) => a.props.status.toLowerCase().localeCompare(b.props.status.toLowerCase());
        
        if (sort === 'advisor') {
            return inputItems.sort((a, b) => sortByAdvisor(a, b))
        } else if (sort === 'project') {
            return inputItems.sort((a, b) => sortByProject(a, b))
        } else if (sort === 'pm') {
            return inputItems.sort((a, b) => sortByPM(a, b))
        } else if (sort === 'date-asc') {
            return inputItems.sort((a, b) => sortByDate(a, b, ASC))
        } else if (sort === 'date-desc') {
            return inputItems.sort((a, b) => sortByDate(a, b, DSC))
        } else if (sort === 'status') {
            return inputItems.sort((a, b) => sortByStatus(a, b))
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
                    <MainListTools setQuery={this.setQuery} setSort={this.setSort} checkedItems={this.state.checkedItems} clearChecked={this.clearChecked} />
                    <br></br>
                    <div>
                        <MainListBody renderListItems={this.renderListItems} openEmailForm={this.openEmailForm} closeEmailForm={this.closeEmailForm} setChecked={this.setChecked} clearChecked={this.clearChecked} />
                        {this.renderNoItemMessage()}
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} advisor={this.state.emailAdvisor} pm_name={this.state.emailPmName} closeEmailForm={this.closeEmailForm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}