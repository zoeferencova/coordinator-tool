import React from 'react';
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import CompletedListTools from '../../components/CompletedListTools/CompletedListTools'
import CompletedListBody from '../../components/CompletedListBody/CompletedListBody'
import CompletedListItem from '../../components/CompletedListItem/CompletedListItem'
import Header from '../../components/Header/Header'

import tableStyles from '../../components/Utils/shared-styles/TableStyles.module.css'

export default class CompletedListPage extends React.Component {
    static contextType = AppContext;

    state = {
        query: '',
        sort: 'date-desc'
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
                project_url={item.project_url}
                advisor={item.advisor}
                advisor_url={item.advisor_url}
                pm_name={item.pm_name}
                pm_email={item.pm_email}
                date_created={new Date(item.date_created).toLocaleDateString('en-US', this.context.dateOptions)}
                date_completed={new Date(item.date_completed).toLocaleDateString('en-US', this.context.dateOptions)}
                unformatted_date={item.date_completed}
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
                    <div className={tableStyles.listContainer}>
                        <CompletedListTools setQuery={this.setQuery}  />
                        <br></br>
                        <CompletedListBody currentSort={this.state.sort} setSort={this.setSort} renderCompletedItems={this.renderCompletedItems} />
                    </div>
                </main>
                <NavBar />
            </div>
        )
    }
}