import React from 'react';
import AppContext from '../../contexts/contexts'
import './CompletedListBody.css'

export default class CompletedListBody extends React.Component {   
    static contextType = AppContext;
    
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
                {this.props.renderCompletedItems()}
            </div>
        ) 
    }
}