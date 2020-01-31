import React from 'react';
import './MobileListItem.css'

export default class MobileListItem extends React.Component {
    state = {
        popup: false
    }

    render() {
        return (
            <div className="table-row row">
                <div className="table-body-cell"><input type="checkbox"></input></div>
                <div className="table-body-cell">
                    <select name="status" id="status">
                        <option value="none"></option>
                        <option value="reached">Reached Out</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="table-body-cell proj-cell">{this.props.project}</div>
                <div className="table-body-cell adv-cell">{this.props.advisor}</div>
                <div className="table-body-cell">
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