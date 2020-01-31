import React from 'react';
import './ArchiveItem.css'

export default class ArchiveItem extends React.Component {
    state = {
        expanded: false
    }
    
    render() {
        return (
            <div>
                <div className="archive-item" onClick={() => this.state.expanded ? this.setState({ expanded: false }) : this.setState({ expanded: true })}><h2>{this.props.date}</h2></div>
                {this.state.expanded && <p>{this.props.summary}</p>}
            </div>
        )
    }
}