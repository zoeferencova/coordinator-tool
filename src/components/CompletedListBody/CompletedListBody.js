import React from 'react';
import AppContext from '../../contexts/contexts'
import './CompletedListBody.css'
import CompletedListItem from '../CompletedListItem/CompletedListItem';

export default class CompletedListBody extends React.Component {   
    static contextType = AppContext;
    
    renderRows() {
        return this.context.completedListItems.map(row => 
            <CompletedListItem
                key={row.id}
                project={row.project}
                advisor={row.advisor}
                pm={row.pm}
                date={row.date}
            />
        )
    }
    
    render() {
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-header-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell">PM</div>
                    <div className="table-header-cell">Date</div>
                    <div className="table-header-cell">Actions</div>
                </div>
                {this.renderRows()}
            </div>
        ) 
    }
}