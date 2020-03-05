import React from 'react';
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import CompletedListTools from '../../components/CompletedListTools/CompletedListTools'
import CompletedListBody from '../../components/CompletedListBody/CompletedListBody'
import CompletedListItem from '../../components/CompletedListItem/CompletedListItem'
import Header from '../../components/Header/Header'
import ListService from '../../services/list-service';

import tableStyles from '../../components/Utils/shared-styles/TableStyles.module.css'

export default class CompletedListPage extends React.Component {
    static contextType = AppContext;

    state = {
        query: '',
        sort: 'date-desc'
    }

    //Sets query state on change of search input
    setQuery = (query) => {
        const lowerCaseQuery = query.toLowerCase()
        this.setState({ query: lowerCaseQuery })
    }

    setSort = (sort) => {
        this.setState({ sort })
    }

    //Items are rendered based on search and sort queries
    //Search and sort functions are stored in the list-service.js file
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
                contact={item.contact}
                contact_url={item.contact_url}
                pm_name={item.pm_name}
                pm_email={item.pm_email}
                date_created={new Date(item.date_created).toLocaleDateString('en-US', this.context.dateOptions)}
                date_completed={new Date(item.date_completed).toLocaleDateString('en-US', this.context.dateOptions)}
                unformatted_date={item.date_completed}
            />
        )
        const searchedItems = ListService.searchItems(itemArray, query)
        if (sort === 'none') {
            return searchedItems;
        } else {
            return ListService.sortItems(searchedItems, sort)
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