import React from 'react';
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import CompletedListTools from '../../components/CompletedListTools/CompletedListTools'
import CompletedListBody from '../../components/CompletedListBody/CompletedListBody'
import CompletedListItem from '../../components/CompletedListItem/CompletedListItem'
import Header from '../../components/Header/Header'
import config from '../../config'
import './CompletedListPage.css';

export default class CompletedListPage extends React.Component {
    static contextType = AppContext;

    state = {
        query: '',
        sort: 'none'
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/completed`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
            })
                .then(res => res.json())
                .then(resJson => this.context.setCompletedItems(resJson))
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

    sortItems = (inputItems, sort) => {
        const ASC = 'ascending';
        const DSC = 'descending';

        const sortByAdvisor = (a, b) => a.props.advisor.toLowerCase().localeCompare(b.props.advisor.toLowerCase());
        const sortByProject = (a, b) => a.props.project.toLowerCase().localeCompare(b.props.project.toLowerCase());
        const sortByPM = (a, b) => a.props.pm.name.toLowerCase().localeCompare(b.props.pm.name.toLowerCase());
        const sortByDate = (a, b, order=ASC) => {
            const diff = new Date(a.props.date_created) - new Date(b.props.date_created);
            return order === ASC ? diff : -1 * diff
        };
        
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
        }
    }

    setQuery = (query) => {
        const lowerCaseQuery = query.toLowerCase()
        this.setState({ query: lowerCaseQuery })
    }

    setSort = (sort) => {
        this.setState({ sort })
    }

    renderCompletedItems = () => { 
        const { query, sort } = this.state;
        const { completedListItems } = this.context;
        const itemArray = completedListItems.map(item => 
            <CompletedListItem
                key={item.id}
                id={item.id}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm_name={item.pm_name}
                pm_email={item.pm_email}
                date_created={new Date(item.date_created).toLocaleDateString('en-US', this.context.dateOptions)}
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
        return (
            <div className="container">
                <main className="content">
                    <Header title={"Completed"} />
                    <CompletedListTools setQuery={this.setQuery} setSort={this.setSort} />
                    <br></br>
                    <CompletedListBody renderCompletedItems={this.renderCompletedItems} />
                </main>
                <NavBar />
            </div>
        )
    }
}