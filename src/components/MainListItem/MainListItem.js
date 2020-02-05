import React from 'react';
import './MainListItem.css'

const icons = {
    'none': <i className="far fa-circle"></i>,
    'reached': <i className="fas fa-arrow-circle-left"></i>,
    'completed': <i className="fas fa-check-circle"></i>
}

export default class MainListItem extends React.Component {
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
                <div className="table-body-cell"><input type="checkbox"></input></div>
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
                <div className="table-body-cell">{this.props.pm}</div>
                <div className="table-body-cell">{this.props.date}</div>
                <div className="table-body-cell notes-cell">{this.props.notes}</div>
                <div className="table-body-cell">
                    <button><i className="fas fa-envelope"></i></button>
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}