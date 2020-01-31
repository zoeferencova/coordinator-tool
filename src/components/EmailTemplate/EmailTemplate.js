import React from 'react';
import './EmailTemplate.css'

export default class EmailTemplate extends React.Component {
    state = {
        expanded: false
    }
    
    render() {
        return (
            <div>
                <div className="template-item" onClick={() => this.state.expanded ? this.setState({ expanded: false }) : this.setState({ expanded: true })}>
                    <h2 >{this.props.template_name}</h2>
                </div>
                {this.state.expanded && <div >
                    <p>Subject: {this.props.template_subject}</p>
                    <p>Body: {this.props.template_body}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>}
            </div>
            
        )
    }
}