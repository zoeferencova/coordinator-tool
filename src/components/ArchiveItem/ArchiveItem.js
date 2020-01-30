import React from 'react';
import './ArchiveItem.css'

export default class ArchiveItem extends React.Component {
    render() {
        return (
            <div className="item">
                <h2>{this.props.date}</h2>
                <p>{this.props.summary}</p>
            </div>
        )
    }
}