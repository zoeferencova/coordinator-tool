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
        emailPm: '',
        query: '',
    }

    openEmailForm = (project, advisor, pm) => {
        this.setState({ emailFormOpen: true })
        this.setState({
            emailProject: project,
            emailAdvisor: advisor,
            emailPm: pm
        })
    }

    setQuery = (query) => {
        this.setState({ query })
    }

    closeEmailForm = () => {
        this.setState({
            emailFormOpen: false,
            emailProject: '',
            emailAdvisor: '',
            emailPm: '',
        })
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
        const query = this.state.query;
        const { listItems } = this.context;
        const itemArray = listItems.map(item => 
            <MainListItem
                key={item.id}
                checked={item.checked}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm={item.pm}
                date={new Date(item.date).toLocaleDateString('en-US', this.context.dateOptions)}
                notes={item.notes}
                openEmailForm={this.openEmailForm}
                closeEmailForm={e => this.closeEmailForm}
            />
        )

        return this.searchItems(itemArray, query)
    }

    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        const title = new Date().toLocaleDateString("en-US", dateOptions)

        return (
            <div className="container">
                <main className="content">
                    <Header title={title} />
                    <MainListTools setQuery={this.setQuery} />
                    <br></br>
                    <div className='main-list-container'>
                        <MainListBody renderListItems={this.renderListItems} openEmailForm={this.openEmailForm} closeEmailForm={this.closeEmailForm} />
                    </div>
                    {this.state.emailFormOpen && <SendEmailForm project={this.state.emailProject} advisor={this.state.emailAdvisor} pm={this.state.emailPm} closeEmailForm={this.closeEmailForm} />}
                </main>
                <NavBar />
            </div>
            
        )
    }
}