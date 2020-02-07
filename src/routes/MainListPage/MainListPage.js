import React from 'react';
import AppContext from '../../contexts/contexts'
import './MainListPage.css'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';
import SendEmailForm from '../../components/SendEmailForm/SendEmailForm'
import MainListItem from '../../components/MainListItem/MainListItem'


export default class MainListPage extends React.Component {
    static contextType = AppContext;
    
    state = {
        emailFormOpen: false,
        emailProject: '',
        emailAdvisor: '',
        emailPm: {},
        query: '',
        sort: 'none',
    }

    openEmailForm = (project, advisor, pm_name, pm_email) => {
        this.setState({ emailFormOpen: true })
        this.setState({
            emailProject: project,
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
            emailPm: '',
        })
    }

    sortItems = (inputItems, sort) => {
        const ASC = 'ascending';
        const DSC = 'descending';

        const sortByAdvisor = (a, b) => a.props.advisor.toLowerCase().localeCompare(b.props.advisor.toLowerCase());
        const sortByProject = (a, b) => a.props.project.toLowerCase().localeCompare(b.props.project.toLowerCase());
        const sortByPM = (a, b) => a.props.pm_name.toLowerCase().localeCompare(b.props.pm_name.toLowerCase());
        const sortByDate = (a, b, order=ASC) => {
            const diff = new Date(a.props.date) - new Date(b.props.date);
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
                checked={item.checked}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm_name={item.pm_name}
                pm_email={item.pm_email}
                date={new Date(item.date).toLocaleDateString('en-US', this.context.dateOptions)}
                notes={item.notes}
                openEmailForm={this.openEmailForm}
                closeEmailForm={e => this.closeEmailForm}
            />
        )
        const searchedItems = this.searchItems(itemArray, query)
        if (sort === 'none') {
            return searchedItems;
        } else {
            return this.sortItems(searchedItems, sort)
        }
    }

    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        const title = new Date().toLocaleDateString("en-US", dateOptions)

        return (
            <div className="container">
                <main className="content">
                    <Header title={title} />
                    <MainListTools setQuery={this.setQuery} setSort={this.setSort} />
                    <br></br>
                    <div className='main-list-container'>
                        <MainListBody renderListItems={this.renderListItems} openEmailForm={this.openEmailForm} closeEmailForm={this.closeEmailForm} />
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} advisor={this.state.emailAdvisor} pm={this.state.emailPmName} pm_email={this.state.emailPmEmail} closeEmailForm={this.closeEmailForm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}