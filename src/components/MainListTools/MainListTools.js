import React from 'react';
import AppContext from '../../contexts/contexts'
import { Button, Input, Select } from '../Utils/Utils'
import { Link } from 'react-router-dom';
import config from '../../config'

import styles from './MainListTools.module.css'

export default class MainListTools extends React.Component {
    static contextType = AppContext;

    formatEmailUpdate = () => {
        const { listItems } = this.context;
        const allItems = {}
        listItems.forEach(item => {
            const itemPmName = item.pm_name;
            if (allItems[itemPmName]) {
                allItems[itemPmName].push(item)
            } else {
                allItems[itemPmName] = [item];
            }
        })

        const updateArray = []
        
        for (let [key, value] of Object.entries(allItems)) {
            updateArray.push(`${key}%0A%0A${value.map(item => `${item.project.replace('&', 'and')} - ${item.advisor}%0A`).join('')}`)
        }

        return updateArray.join('%0A%0A')
    }

    formatUpdateEmailAddresses = () => {
        const { listItems } = this.context;
        const pmEmails = []
        if (listItems) {
            listItems.forEach(item => {
                if (!pmEmails.includes(item.pm_email)) {
                    pmEmails.push(item.pm_email)  
                }
            })
        }
        return pmEmails.join('; ')
    }

    fireAction(status) {
        const checked = this.props.checkedItems;
        if (status === 'reached') {
            checked.forEach(itemId => {
                const item = this.context.listItems.find(item => item.id === itemId)
                const foundPm = this.context.pms.find(pm => pm.pm_email === item.pm_email)
                const pmId = foundPm.id;
                const { project, advisor } = item;
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
                            : this.context.updateItemStatus(itemId, status))
                    .then(this.props.clearChecked())
                    .catch(error => console.log(error))
            })
        } else if (status === 'completed') {
            if (window.confirm('Are you sure you want to mark the checked items completed?')) {
                checked.forEach(itemId => {
                    const item = this.context.listItems.find(item => item.id === itemId)
                    const foundPm = this.context.pms.find(pm => pm.pm_email === item.pm_email)
                    const pmId = foundPm.id;
                    const { project, advisor } = item;
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
                                : this.context.updateItemStatus(itemId, status))
                        .then(this.props.clearChecked())
                        .catch(error => console.log(error))
                })
            } else {
                return null;
            }  
        } else if (status === 'delete') {
            if (window.confirm('Are you sure you want to delete the selected items?')) {
                checked.forEach(item => {
                    fetch(`${config.API_ENDPOINT}/list/${item}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                        }
                            
                    })
                        .then(res => this.context.deleteItem(item))
                        .then(this.props.clearChecked())
                        
                })
            } else {
                return null;
            }
            
        } else if (status === 'reset') {
            this.context.listItems.forEach(item => {
                const { project, advisor } = item
                const foundPm = this.context.pms.find(pm => pm.pm_email === item.pm_email)
                const pmId = foundPm.id;
                const itemId = item.id;
                fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                    },
                    body: JSON.stringify({ project, advisor, pm_id: pmId, status: 'none' })
                })
                    .then(res => this.context.updateItemStatus(itemId, 'none'))
                    .then(this.props.clearChecked())
                    
            })
        }

    }

    
    render() {
        return (
            <div className={styles.tools}>
                <div className={styles.flex}>
                    <div>
                        <label htmlFor="search">Search: </label>
                        <Input type="text" id="search" onChange={e => this.props.setQuery(e.target.value)}></Input>
                    </div>
                    
                </div>
                <div className={styles.flex}>
                    <div>
                        <label htmlFor="action" className={styles.hideMobile}>Actions: </label>
                        <Select className={`${styles.hideMobile} ${styles.select}`} name="action" id="action" value={'none'} onChange={e => this.fireAction(e.target.value)}>
                            <option value="none"></option>
                            <option value="completed">Mark Completed</option>
                            <option value="reached">Mark Pending</option>
                            <option value="delete">Delete</option>
                        </Select>
                    </div>
                    
                    <Button onClick={e => this.fireAction('reset')} className={styles.toolButton}>Reset</Button>
                    <a href={`mailto:${this.formatUpdateEmailAddresses()}?Subject=Update - ${new Date().toLocaleDateString('en-US', {month: 'long', weekday: 'long', day: 'numeric'})}&Body=${this.formatEmailUpdate()}`}><Button className={styles.toolButton}>PM Update</Button></a>
                    <Link to='/add-item'><Button className={`${styles.addButton}`}>+ Add Item</Button></Link>
                </div>
                
            </div>
        )
    }
}