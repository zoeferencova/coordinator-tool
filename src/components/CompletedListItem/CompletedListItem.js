import React from 'react';
import config from '../../config'
import AppContext from '../../contexts/contexts'
import './CompletedListItem.css'

export default class CompletedListItem extends React.Component {
    static contextType = AppContext;
    
    handleRevert = (e, itemId) => {
        e.preventDefault();
        const item = this.context.completedListItems.find(item => item.id === itemId)
        const { project, advisor } = item;
        const foundPm = this.context.pms.find(pm => pm.pm_email === item.pm_email)
        const pmId = foundPm.id;
        const status = 'none'
        fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ status, project, advisor, pm_id: pmId })
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : this.context.revertCompleted(itemId)
                )
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className="table-row">
                <div className="table-body-cell comp-proj-cell">{this.props.project}</div>
                <div className="table-body-cell adv-cell">{this.props.advisor}</div>
                <div className="table-body-cell pm-cell comp-pm-cell">{this.props.pm_name}</div>
                <div className="table-body-cell date-cell hide-mobile">{this.props.date_created}</div>
                <div className="table-body-cell comp-revert">
                    <button onClick={e => this.handleRevert(e, this.props.id)}>Revert</button>
                </div>
            </div>
        )
    }
}