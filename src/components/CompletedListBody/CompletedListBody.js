import React from 'react';
import AppContext from '../../contexts/contexts'
import './CompletedListBody.css'

export default class CompletedListBody extends React.Component {   
    static contextType = AppContext;
    
    render() {
        return (
            <div className="table completed-list">
                <div className="table-header">
                    <div className="table-header-cell comp-proj-cell">Project</div>
                    <div className="table-header-cell">Advisor</div>
                    <div className="table-header-cell comp-pm-cell">PM</div>
                    <div className="table-header-cell hide-mobile">Date</div>
                    <div className="table-header-cell actions-column comp-revert">Actions</div>
                </div>
                {this.props.renderCompletedItems()}
            </div>
        ) 
    }
}