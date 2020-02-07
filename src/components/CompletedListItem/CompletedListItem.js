import React from 'react';
import './CompletedListItem.css'

export default class CompletedListItem extends React.Component {
    
    render() {
        return (
            <div className="table-row">
                <div className="table-body-cell proj-cell">{this.props.project}</div>
                <div className="table-body-cell adv-cell">{this.props.advisor}</div>
                <div className="table-body-cell">{this.props.pm_name}</div>
                <div className="table-body-cell">{this.props.date_created}</div>
                <div className="table-body-cell">
                    <button>Revert</button>
                </div>
            </div>
        )
    }
}