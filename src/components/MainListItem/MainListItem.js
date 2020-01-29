import React from 'react';
import './MainListItem.css'

export default class MainListItem extends React.Component {
    
    render() {
        return (
            <div className="table-row">
                <div className="table-body-cell"><input type="checkbox"></input></div>
                <div className="table-body-cell">
                    <select name="status" id="status">
                        <option value="none"></option>
                        <option value="reached">Reached Out</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="table-body-cell">{this.props.project}</div>
                <div className="table-body-cell">{this.props.advisor}</div>
                <div className="table-body-cell">{this.props.pm}</div>
                <div className="table-body-cell">{this.props.date}</div>
                <div className="table-body-cell">{this.props.notes}</div>
                <div className="table-body-cell">
                    <button><i className="fas fa-envelope"></i></button>
                    <button><i className="fas fa-edit"></i></button>
                    <button><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        )
    }
}