import React from 'react';
import config from '../../config'
import AppContext from '../../contexts/contexts'
import './CompletedListItem.css'

export default class CompletedListItem extends React.Component {
    static contextType = AppContext;
    
    handleRevert = (e, id) => {
        e.preventDefault();
        const status = 'none'
        fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ status })
        })
            .then(res => this.context.revertCompleted(id))
    }


    render() {
        return (
            <div className="table-row">
                <div className="table-body-cell proj-cell">{this.props.project}</div>
                <div className="table-body-cell adv-cell">{this.props.advisor}</div>
                <div className="table-body-cell pm-cell">{this.props.pm_name}</div>
                <div className="table-body-cell date-cell">{this.props.date_created}</div>
                <div className="table-body-cell">
                    <button onClick={e => this.handleRevert(e, this.props.id)}>Revert</button>
                </div>
            </div>
        )
    }
}