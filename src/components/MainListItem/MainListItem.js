import React from 'react';
import AppContext from '../../contexts/contexts'
import './MainListItem.css'
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import config from '../../config';

const icons = {
    'none': <i className="far fa-circle"></i>,
    'reached': <i className="fas fa-arrow-circle-left"></i>,
    'completed': <i className="fas fa-check-circle"></i>
}

export default class MainListItem extends React.Component {
    static contextType = AppContext;
    
    state = {
        expanded: false
    }

    handleStatusClick(status, id) {
        fetch(`${config.API_ENDPOINT}/list/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify({ status })
        })
            .then(res => this.context.updateItemStatus(id, status))

        if (this.state.expanded === true) {
            this.setState({ expanded: false })
        } else {
            this.setState({ expanded: true })
        }
    }

    handleDeleteItem(e) {
        e.preventDefault();
        const itemId = ReactDOM.findDOMNode(e.target).parentNode.getAttribute('itemkey')
        
        fetch(`${config.API_ENDPOINT}/list/${itemId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
        this.context.deleteItem(itemId)
    }

    render() {
        const { id, project, advisor, pm_name, pm_email, notes, status, date_created } = this.props;
        return (
            <div className="table-row row">
                <div className="table-body-cell hide-mobile"><input type="checkbox" id="list-checkbox" onChange={e => this.props.setChecked(id)}></input></div>
                <div className="table-body-cell">
                    <span className="status-icon" onClick={() => this.state.expanded === true ? this.setState({ expanded: false }) : this.setState({ expanded: true })}>{icons[status]}</span>
                    <ul className={`icon-list hide-list ${this.state.expanded && 'show-list'}`}>
                        <li onClick={() => this.handleStatusClick('none', id)}>{icons['none']} None</li>
                        <li onClick={() => this.handleStatusClick('reached', id)}>{icons['reached']} Reached Out</li>
                        <li className='last' onClick={() => this.handleStatusClick('completed', id)}>{icons['completed']} Completed</li>
                    </ul>
                </div>
                <div className="table-body-cell proj-cell">{project}</div>
                <div className="table-body-cell adv-cell">{advisor}</div>
                <div className="table-body-cell hide-mobile">{pm_name}</div>
                <div className="table-body-cell hide-mobile">{date_created}</div>
                <div className="table-body-cell notes-cell hide-mobile">{notes}</div>
                <div className="table-body-cell hide-mobile">
                    <button onClick={() => this.props.openEmailForm(project, advisor, pm_name, pm_email)}><i className="fas fa-envelope"></i></button>
                    <Link to={{pathname:`/edit-item/${id}`, itemProps: {project, advisor, pm_name, notes}}} ><button onClick={this.handleEditItem}><i className="fas fa-edit"></i></button></Link>
                    <button itemkey={id} onClick={e => this.handleDeleteItem(e)}><i className="fas fa-trash-alt"></i></button>
                </div>
                <div className="table-body-cell hide-desktop">
                    <div 
                        onClick={() => this.state.popup 
                            ? this.setState({ popup: false }) 
                            : this.setState({popup: true})}
                    >
                        <i className="far fa-caret-square-down"></i>
                    </div>
                    <div className={`popup ${this.state.popup ? 'show' : 'hidden'}`}>
                        <div>PM: {pm_name}</div>
                        <div>Date: {date_created}</div>
                        <div>Notes: {notes}</div>
                        <div>Email...</div>
                        <div>Edit...</div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
        )
    }
}