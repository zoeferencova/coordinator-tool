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
        popup: false
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

    //Renders separate actions column ellipsis icon for mobile view that triggers a modal with additional information and actions
    render() {
        const { id, project, project_url, contact, contact_url, pm_name, pm_email, notes, status, date_created } = this.props;
        return (
            <div className={`${tableStyles.tableRow}`}>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.check}`}><input type="checkbox" id="list-checkbox" onChange={e => this.props.setChecked(id)}></input></div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.project}`}>{project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.contact}`}>{contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.pm}`}>{pm_name}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.date}`}>{date_created}</div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.notes}`}>{notes}</div>
                <div className={`${tableStyles.tableBodyCell} ${listStyles.status}`}>
                    <select className={`${styles.statusSelect} ${status === 'reached' ? styles.pending : ''}`} value={status} onChange={(e) => this.handleStatusClick(e.target.value, this.props.id, project, contact, pm_email)}>
                        <option value='none'></option>
                        <option value='reached'>Pending</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>
                <div className={`${tableStyles.tableBodyCell} ${tableStyles.hideMobile} ${listStyles.actions}`}>
                    <button className={`${styles.icon}`} onClick={() => this.props.openEmailForm(project, contact, pm_name, pm_email)}><i className="fas fa-envelope"></i><span className={styles.srOnly}>send email</span></button>
                    <Link to={{pathname:`/edit-item/${id}`, itemProps: {project, contact, pm_name, notes}}} ><button className={`${styles.icon}`}  onClick={this.handleEditItem}><i className="fas fa-edit"></i><span className={styles.srOnly}>edit item</span></button></Link>
                    <button className={`${styles.icon}`} itemkey={id} onClick={e => this.handleDeleteItem(e)}><i className="fas fa-trash"></i><span className={styles.srOnly}>delete item</span></button>
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
                            <i onClick={() => this.setState({ popup: false })} className={` ${tableStyles.pointer} ${styles.close} fas fa-times`}></i>
                            <p className={`${styles.heading} ${styles.first}`}>Item Info</p>
                            <div className={styles.info}> 
                                <p><span className={styles.columnName}>Project</span> {project_url !== '' ? <a href={project_url} target="_blank" rel="noopener noreferrer">{project}</a> : project}</p>
                                <p><span className={styles.columnName}>Contact</span> {contact_url !== '' ? <a href={contact_url} target="_blank" rel="noopener noreferrer">{contact}</a> : contact}</p>
                                <p><span className={styles.columnName}>PM</span> {pm_name}</p>
                                <p><span className={styles.columnName}>Date Created</span>  {date_created}</p>
                                
                                {this.props.notes && <p>Notes: {notes}</p>}
                            </div>
                            <div className={styles.popupActions}>
                                <p className={styles.heading}>Actions</p>
                                <button className={`${styles.icon}`} itemkey={id} onClick={() => {this.props.openEmailForm(project, contact, pm_name, pm_email); this.setState({ popup: false })}}><i className="fas fa-envelope"></i></button>
                                <Link to={{pathname:`/edit-item/${id}`, itemProps: {project, contact, pm_name, notes}}} ><button className={`${styles.icon}`}  onClick={this.handleEditItem}><i className="fas fa-edit"></i></button></Link>
                                <button className={`${styles.icon}`} itemkey={id}  onClick={e => this.handleDeleteItem(e)}><i className="fas fa-trash"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}