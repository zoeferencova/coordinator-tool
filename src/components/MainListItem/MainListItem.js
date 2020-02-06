import React from 'react';
import AppContext from '../../contexts/contexts'
import './MainListItem.css'

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

    handleStatusClick(status) {
        this.setState({status});
        if (this.state.expanded === true) {
            this.setState({ expanded: false })
        } else {
            this.setState({ expanded: true })
        }
    }

    render() {
        return (
            <div className="table-row row">
                <div className="table-body-cell hide-mobile"><input type="checkbox" id="list-checkbox"></input></div>
                <div className="table-body-cell">
                    <span className="status-icon" onClick={() => this.state.expanded === true ? this.setState({ expanded: false }) : this.setState({ expanded: true })}>{icons[this.props.status]}</span>
                    <ul className={`icon-list hide-list ${this.state.expanded && 'show-list'}`}>
                        <li onClick={() => this.handleStatusClick('none')}>{icons['none']} None</li>
                        <li onClick={() => this.handleStatusClick('reached')}>{icons['reached']} Reached Out</li>
                        <li className='last' onClick={() => this.handleStatusClick('completed')}>{icons['completed']} Completed</li>
                    </ul>
                </div>
                <div className="table-body-cell proj-cell">{this.props.project}</div>
                <div className="table-body-cell adv-cell">{this.props.advisor}</div>
                <div className="table-body-cell hide-mobile">{this.props.pm}</div>
                <div className="table-body-cell hide-mobile">{this.props.date}</div>
                <div className="table-body-cell notes-cell hide-mobile">{this.props.notes}</div>
                <div className="table-body-cell hide-mobile">
                    <button onClick={() => this.props.openEmailForm(this.props.project, this.props.advisor, this.props.pm)}><i className="fas fa-envelope"></i></button>
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-trash-alt"></i></button>
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
                        <div>PM: {this.props.pm}</div>
                        <div>Date: {this.props.date}</div>
                        <div>Notes: {this.props.notes}</div>
                        <div>Email...</div>
                        <div>Edit...</div>
                        <div>Delete</div>
                    </div>
                </div>
            </div>
        )
    }
}