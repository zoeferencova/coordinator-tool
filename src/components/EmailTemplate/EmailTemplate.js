import React from 'react';
import './EmailTemplate.css'

export default class EmailTemplate extends React.Component {
    state = {
        expanded: false,
        edit: false
    }

    handleEmailEdit = () => {
        this.setState({ edit: true })
    }

    closeEmailEdit = () => {
        this.setState({ edit: false })
    }
    
    render() {
        return (
            <div>
                <div className="template-item" onClick={() => this.state.expanded ? this.setState({ expanded: false, edit: false }) : this.setState({ expanded: true })}>
                    <h2 >{this.props.template_name}</h2>
                </div>
                {this.state.expanded && !this.state.edit && <div className="template-contents">
                    <p>Subject: {this.props.template_subject}</p>
                    <p className= 'template-body'>Body: {this.props.template_body}</p>
                    <button onClick={this.handleEmailEdit}>Edit</button>
                    <button>Delete</button>
                </div>}
                {this.state.expanded && this.state.edit && <form>
                        <div>
                            <label htmlFor="template-name">Template Name: </label>
                            <input type="text" name='template-name' id='template-name' defaultValue={this.props.template_name}></input>
                        </div>
                        <div>
                            <label htmlFor="template-subject">Subject: </label>
                            <input type="text" name='template-subject' id='template-subject' defaultValue={this.props.template_subject}></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="template-body">Body: </label>
                            <textarea name="template-body" id="template-body" cols="100" rows="30" defaultValue={this.props.template_body}></textarea>
                        </div>
                        <div>
                            <button onClick={this.closeEmailEdit}>Cancel</button>
                            <button type='submit'>Save</button>
                        </div>
                    </form>}
            </div>
            
        )
    }
}