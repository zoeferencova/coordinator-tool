import React from 'react';
import AppContext from '../../contexts/contexts'
import './MainListTools.css'
import { Link } from 'react-router-dom';
import config from '../../config'

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
            updateArray.push(`${key}%0A%0A${value.map(item => `${item.project} - ${item.advisor}%0A`).join('')}`)
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
        if (status === 'completed' || status === 'reached') {
            checked.forEach(item => {
                fetch(`${config.API_ENDPOINT}/list/${item}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                    },
                    body: JSON.stringify({ status })
                })
                    .then(res => this.context.updateItemStatus(item, status))
                    .then(this.props.clearChecked())
            })
        } else if (status === 'delete') {
            checked.forEach(item => {
                console.log(item + ' working')
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
        } else if (status === 'reset') {
            this.context.listItems.forEach(item => {
                const itemId = item.id;
                fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                    },
                    body: JSON.stringify({ status: 'none' })
                })
                    .then(res => this.context.updateItemStatus(itemId, 'none'))
                    .then(this.props.clearChecked())
                    
            })
        }

    }

    
    render() {
        return (
            <div className="tools">
                <div>
                    <label htmlFor="search">Search: </label>
                    <input type="text" id="search" onChange={e => this.props.setQuery(e.target.value)}></input>
                </div>

                    <div>
                        <label htmlFor="sort">Sort by: </label>
                        <select name="sort" id="sort" onChange={e => this.props.setSort(e.target.value)}>
                            <option value="none"></option>
                            <option value="advisor">Advisor (A-Z)</option>
                            <option value="project">Project Name</option>
                            <option value="pm">PM</option>
                            <option value="date-desc">Date (Newest-Oldest)</option>
                            <option value="date-asc">Date (Oldest-Newest)</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div className="hide-mobile">
                        <label htmlFor="action">Actions: </label>
                        <select name="action" id="action" value={'none'} onChange={e => this.fireAction(e.target.value)}>
                            <option value="none"></option>
                            <option value="completed">Mark Completed</option>
                            <option value="reached">Mark Reached Out</option>
                            <option value="delete">Delete</option>
                        </select>
                    </div>

                <div>
                    <button onClick={e => this.fireAction('reset')}>Reset</button>
                    <a href={`mailto:${this.formatUpdateEmailAddresses()}?Subject=Update - ${new Date().toLocaleDateString('en-US', {month: 'long', weekday: 'long', day: 'numeric'})}&Body=${this.formatEmailUpdate()}`}><button>Send Update</button></a>
                    <Link to='/add-item'><button>Add Item</button></Link>
                </div>
                
            </div>
        )
    }
}