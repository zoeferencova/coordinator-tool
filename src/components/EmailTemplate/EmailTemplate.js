import React from 'react';
import ReactDOM from 'react-dom';
import config from '../../config'
import AppContext from '../../contexts/contexts'
import './EmailTemplate.css'

export default class EmailTemplate extends React.Component {
    static contextType = AppContext;
    
    state = {
        expanded: false,
        edit: false,
        inputValues: {}
    }

    handleDeleteTemplate(e) {
        e.preventDefault();
        const templateId = ReactDOM.findDOMNode(e.target).parentNode.getAttribute('itemkey')
        console.log(templateId)
        fetch(`${config.API_ENDPOINT}/templates/${templateId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
        this.context.deleteTemplate(templateId)
    }

    handlePatchTemplate(e) {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/templates/${this.props.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(this.state.inputValues)
        })
            .then(res => this.context.updateTemplate(this.state.inputValues))
            .then(this.setState({ edit: false, expanded: false }))
    }

    componentDidMount() {
        const templateId = this.props.id;
        
        fetch(`${config.API_ENDPOINT}/templates/${templateId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
            .then(res => res.json())
            .then(resJson => this.setState({ inputValues: resJson }))
    }

    handleEmailEdit = () => {
        this.setState({ edit: true })
    }

    closeEmailEdit = () => {
        this.setState({ edit: false })
    }

    handleChangeName = val => {
        this.setState({ inputValues: { ...this.state.inputValues, template_name: val } })
    }

    handleChangeSubject = val => {
        this.setState({ inputValues: {...this.state.inputValues, template_subject: val } })
    }

    handleChangeContent = val => {
        this.setState({ inputValues: { ...this.state.inputValues, template_content: val } })
    }
    
    render() {
        return (
            <div>
                <div className="template-item" onClick={() => this.state.expanded ? this.setState({ expanded: false, edit: false }) : this.setState({ expanded: true })}>
                    <h2 >{this.props.template_name}</h2>
                </div>
                {this.state.expanded && !this.state.edit && <div className="template-contents" itemkey={this.props.id}>
                    <p>Subject: {this.props.template_subject}</p>
                    <p className= 'template-body'>Body: {this.props.template_content}</p>
                    <button onClick={this.handleEmailEdit}>Edit</button>
                    <button onClick={e => this.handleDeleteTemplate(e)}>Delete</button>
                </div>}
                {this.state.expanded && this.state.edit && <form onSubmit={e => this.handlePatchTemplate(e)}>
                        <div>
                            <label htmlFor="template-name">Template Name: </label>
                            <input type="text" name='template-name' id='template-name' defaultValue={this.state.inputValues.template_name} onChange={e => this.handleChangeName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="template-subject">Subject: </label>
                            <input type="text" name='template-subject' id='template-subject' defaultValue={this.state.inputValues.template_subject} onChange={e => this.handleChangeSubject(e.target.value)}></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="template-body">Body: </label>
                            <textarea name="template-body" id="template-body" cols="100" rows="30" defaultValue={this.state.inputValues.template_content} onChange={e => this.handleChangeContent(e.target.value)}></textarea>
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