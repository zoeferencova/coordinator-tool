import React from 'react';
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import config from '../../config';

import styles from './MainListItem.module.css'
import listStyles from '../Utils/shared-styles/MainList.module.css'
import tableStyles from '../Utils/shared-styles/TableStyles.module.css'


export default class MainListItem extends React.Component {
    static contextType = AppContext;
    
    state = {
        expanded: false
    }

    handleStatusClick(status, id, project, contact, pmEmail) {
        const pmId = this.context.pms.find(pm => pm.pm_email === pmEmail).id


        fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ project, contact, pm_id: pmId, status })
        })
            .then(res => 
                (!res.ok)
                 ? res.json().then(e => Promise.reject(e))
                : this.context.updateItemStatus(id, status))
            .catch(err => console.log(err))
    }

    handleDeleteItem(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this item?')) {
            const itemId = ReactDOM.findDOMNode(e.target).parentNode.getAttribute('itemkey')
            fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                }
            })
            this.context.deleteItem(itemId)
        } else {
            return e
        }
        
    }

    render() {
        const { id, project, project_url, contact, contact_url, pm_name, pm_email, notes, status, date_created } = this.props;
        return (
            <div className={`${tableStyles.tableRow}`}>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.check} ${tableStyles.hideTablet}`}><input type="checkbox" id="list-checkbox" onChange={e => this.props.setChecked(id)}></input></div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.project}`}>{project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.contact}`}>{contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.pm}`}>{pm_name}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.date}`}>{date_created}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideTablet} ${listStyles.notes}`}>{notes}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.status}`}>
                    <select className={`${styles.statusSelect} ${status === 'reached' ? styles.pending : ''}`} value={status} onChange={(e) => this.handleStatusClick(e.target.value, this.props.id, project, contact, pm_email)}>
                        <option value='none'></option>
                        <option value='reached'>Pending</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.actions}`}>
                    <button className={`${styles.icon}`} onClick={() => this.props.openEmailForm(project, contact, pm_name, pm_email)}><i className="fas fa-envelope"></i></button>
                    <Link to={{pathname:`/edit-item/${id}`, itemProps: {project, contact, pm_name, notes}}} ><button className={`${styles.icon}`}  onClick={this.handleEditItem}><i className="fas fa-edit"></i></button></Link>
                    <button className={`${styles.icon}`} itemkey={id} onClick={e => this.handleDeleteItem(e)}><i className="fas fa-trash"></i></button>
                </div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideDesktop} ${listStyles.mobileActions}`}>
                    <div 
                        onClick={() => this.state.popup 
                            ? this.setState({ popup: false }) 
                            : this.setState({popup: true})}
                    >
                        <i className={`fas fa-ellipsis-h ${tableStyles.pointer}`}></i>
                    </div>
                    <div className={`${styles.popup} ${this.state.popup ? tableStyles.show : tableStyles.hidden}`}>
                        <div className={styles.popupOverlay} onClick={() => this.setState({ popup: false })}></div>
                        <div className={styles.popupContainer}>
                            <div itemkey={id}>
                                <div>PM: {pm_name}</div>
                                <div>Date: {date_created}</div>
                                {this.props.notes && <div>Notes: {notes}</div>}
                                <div className={tableStyles.pointer} onClick={() => {this.props.openEmailForm(project, contact, pm_name, pm_email); this.setState({ popup: false })}} >Email...</div>
                                <Link to={{pathname:`/edit-item/${id}`, itemProps: {project, contact, pm_name, notes}}} ><div className={styles.popupLink} onClick={this.handleEditItem}>Edit...</div></Link>
                                <div className={`${styles.last} ${tableStyles.pointer}`} itemkey={id} onClick={e => this.handleDeleteItem(e)}>Delete</div>
                            </div>
    
                            <div className={`${styles.cancel} ${tableStyles.pointer}`} onClick={() => this.setState({ popup: false })}>Cancel</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}