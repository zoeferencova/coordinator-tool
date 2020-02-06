import React from 'react';
import AppContext from '../../contexts/contexts'
import './MainListTools.css'
import { Link } from 'react-router-dom';

export default class MainListTools extends React.Component {
    static contextType = AppContext;

    formatEmailUpdate = () => {
        const { listItems } = this.context;
        const allItems = {}
        listItems.forEach(item => {
            const itemPm = item.pm;
            if (allItems[itemPm]) {
                allItems[itemPm].push(item)
            } else {
                allItems[itemPm] = [item];
            }
        })

        const updateArray = []
        
        for (let [key, value] of Object.entries(allItems)) {
            updateArray.push(`${key}%0A%0A${value.map(item => `${item.project} - ${item.advisor}%0A`).join('')}`)
        }

        return updateArray.join('%0A%0A')
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
                        <select name="sort" id="sort">
                            <option value="none"></option>
                            <option value="advisor">Advisor (A-Z)</option>
                            <option value="project">Project Name</option>
                            <option value="pm">PM</option>
                            <option value="date-desc">Date (Newest-Oldest)</option>
                            <option value="date-asc">Date (Oldest-Newest)</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="action">Actions: </label>
                        <select name="action" id="action">
                            <option value="none"></option>
                            <option value="mark-completed">Mark Completed</option>
                            <option value="mark-reached">Mark Reached Out</option>
                            <option value="delete-selected">Delete</option>
                        </select>
                    </div>

                <div>
                    <button>Reset</button>
                    <a href={`mailto:?Subject=Update&Body=${this.formatEmailUpdate()}`}><button>Send Update</button></a>
                    <Link to='/add-item'><button>Add Item</button></Link>
                </div>
                
            </div>
        )
    }
}