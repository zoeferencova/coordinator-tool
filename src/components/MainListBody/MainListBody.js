import React from 'react';
import './MainListBody.css'
import MainListItem from '../MainListItem/MainListItem';
import AuthApiService from '../../services/auth-api-service';
import AppContext from '../../contexts/contexts'

export default class MainListBody extends React.Component {   
    static contextType = AppContext;

    renderListItems() { 
        const { listItems } = this.context;
        return listItems.map(item => 
            <MainListItem
                key={item.id}
                checked={item.checked}
                status={item.status}
                project={item.project}
                advisor={item.advisor}
                pm={item.pm}
                date={new Date(item.date).toLocaleDateString('en-US', this.context.dateOptions)}
                notes={item.notes}
                openEmailForm={this.props.openEmailForm}
                closeEmailForm={this.props.closeEmailForm}
            />
        )
    }

    render() {
        const { error } = this.context

        return (
            <div className="table">
                <div className="table-header">
                    <div className='table-header-cell hide-mobile'><input type="checkbox"></input></div>
                    <div className="table-header-cell">Status</div>
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell hide-mobile">PM</div>
                    <div className="table-header-cell hide-mobile">Date</div>
                    <div className="table-header-cell hide-mobile">Notes</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.renderListItems()}
            </div>
            
        ) 
    }
}