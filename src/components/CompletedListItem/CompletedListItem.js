import React from 'react';
import config from '../../config'
import AppContext from '../../contexts/contexts'

import styles from './CompletedListItem.module.css'
import listStyles from '../Utils/shared-styles/CompletedList.module.css'
import tableStyles from '../Utils/shared-styles/TableStyles.module.css'


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
            <div className={tableStyles.tableRow}>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.project}`}>{this.props.project}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.advisor}`}>{this.props.advisor}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.pm}`}>{this.props.pm_name}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.date} ${tableStyles.hideMobile}`}>{new Date((this.props.unformatted_date)).toLocaleDateString('en-US', this.context.dateOptions)}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.actions}`}>
                    <button onClick={e => this.handleRevert(e, this.props.id)} className={styles.revertButton}>Revert</button>
                </div>
            </div>
        )
    }
}