import React from 'react';
import './EmailTemplate.css'

export default class EmailTemplate extends React.Component {
    render() {
        return (
            <div className="item">
                <h2>{this.props.template_name}</h2>
                <p>{this.props.template_subject}</p>
                <p>{this.props.template_body}</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}