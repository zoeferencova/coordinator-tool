import React from 'react';
import './MainListBody.css'
import MainListItem from '../MainListItem/MainListItem';
import AuthApiService from '../../services/auth-api-service';
import AppContext from '../../contexts/contexts'

const dateOptions = { month: 'short', day: 'numeric' }

export default class MainListBody extends React.Component {   
    static contextType = AppContext;

    state = {
        listItems: [],
        error: null,
    }
    
    componentDidMount() {
        AuthApiService.getUserData()
            .then(res => this.setState({ listItems: res }))
    }

    renderListItems() {
        
        const { listItems } = this.state;
        return listItems.map(item => 
            <MainListItem
                key={item.id}
                checked={item.checked}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm={item.pm}
                date={new Date(item.date).toLocaleDateString('en-US', dateOptions)}
                notes={item.notes}
            />
        )
    }

    render() {
        const { error } = this.context
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-header-cell"><input type="checkbox"></input></div>
                    <div className="table-header-cell">Status</div>
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell">PM</div>
                    <div className="table-header-cell">Date</div>
                    <div className="table-header-cell">Notes</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.renderListItems()}
            </div>
            
        ) 
    }
}