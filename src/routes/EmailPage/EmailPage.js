import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import EmailTemplateWindow from '../../components/EmailTemplateWindow/EmailTemplateWindow'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Button, Input, Textarea, Select } from '../../components/Utils/Utils'
import { Link } from 'react-router-dom';
import config from '../../config'

import styles from './EmailPage.module.css'
import listStyles from '../MainListPage/MainListPage.module.css'

export default class EmailPage extends React.Component {
    static contextType = AppContext;

    state = {
        currentTemplate: this.context.templates[0],
        edit: false,
        inputValues: {}
    }

    //Renders tabs used to select template
    renderTemplateTabs() {
        return this.context.templates.map(template => 
            <EmailTemplate
                key={template.id}
                id={template.id}
                template_name={template.template_name}
                template_subject={template.template_subject}
                template_content={template.template_content}
                selectTemplate={this.selectTemplate}
                current={this.state.currentTemplate !== undefined ? this.state.currentTemplate.id : undefined}
            />
        )
    }

    //Renders select for templates, only visible for mobile
    renderTemplateSelect() {
        return this.context.templates.map(template => 
            <option value={template.id} key={template.id}>
                {template.template_name}
            </option>
        )
    }

    selectTemplate = id => {
        const currentTemplate = this.context.templates.find(template => template.id === id)
        this.setState({ currentTemplate, inputValues: currentTemplate })
    }

    renderTemplateContent() {
        const { id, template_name, template_subject, template_content } = this.state.currentTemplate;
        return (
            <EmailTemplateWindow 
                id={id}
                template_name={template_name}
                template_subject={template_subject}
                template_content={template_content}
            />
        )
    }

    handleDeleteTemplate(e) {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this template?')) {
            fetch(`${config.API_ENDPOINT}/templates/${this.state.currentTemplate.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                }
            })
            this.context.deleteTemplate(this.state.currentTemplate.id)
            this.setState({ currentTemplate: this.context.templates[0] })
        } else {
            return null;
        }
    }

    handlePatchTemplate(e) {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/templates/${this.state.inputValues.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(this.state.inputValues)
        })
            .then(res => this.context.updateTemplate(this.state.inputValues))
            .then(this.setState({ edit: false, currentTemplate: this.state.inputValues }))
    }

    closeEmailEdit = (e) => {
        e.preventDefault()
        this.setState({ edit: false, inputValues: {} })
    }

    handleTemplateSelect = (val) => {
        const template = this.context.templates.find(template => Number(template.id) === Number(val))
        this.setState({ currentTemplate: template, inputValues: template })
    }

    //Instructions for how to get started with templates
    //Rendered if no templates are currently saved for user
    renderTemplateInstructions() {
        return (
            <div className={listStyles.instructions}>
                <p>To add a new template:</p>
                <ul>
                    <li>Click the <span className={listStyles.addButtonStyle}>+ New Template</span> button to open the new template form.</li>
                    <li>Use [CONTACT], [PM] and [PROJECT] to indicate the respective values in your template. These values will then be templated in when you use the email functionality in the main list.</li>
                </ul>
                <p>To use the templates:</p>
                <ul>
                    <li>Click the <i className={`${listStyles.tabStyle} fas fa-envelope`}></i> button on any list item in the main list page.</li>
                    <li>Select the template that you want from the dropdown. You will then see a preview of the email populated with the contact and project values.</li>
                    <li>Click the <span className={listStyles.buttonStyle}>Open Email</span> button to open the email using your default email application</li>
                </ul>
                <p>Note: You must have a defualt email application set for the email and PM update features to work.</p>
            </div>
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Email Templates'} />
                    <div className={styles.pageContainer}>
                        {this.context.templates.length === 0 ? this.renderTemplateInstructions() : 
                        (<div className={styles.templateContainer}>
                            <div className={styles.templateList}>
                                {this.renderTemplateTabs()}
                            </div>
                            <div className={styles.templateSelect}>
                                <Select onChange={(e) => this.handleTemplateSelect(e.target.value)} defaultValue={this.currentTemplate !== undefined ? this.currentTemplate.id : ''}>
                                    <option value=''></option>
                                    {this.renderTemplateSelect()}
                                </Select>
                            </div>
                            <div className={styles.templateWindow}>
                                {this.state.currentTemplate !== undefined && !this.state.edit && <div className={styles.templateHeader}>
                                    <h3>{this.state.currentTemplate.template_name}</h3>
                                    <div>
                                        <Button onClick={() => this.setState({ edit: true })}>Edit</Button>
                                        <Button onClick={e => this.handleDeleteTemplate(e)}>Delete</Button>
                                    </div>
                                </div>}
                                {(this.state.currentTemplate !== undefined && !this.state.edit) ? this.renderTemplateContent(): ''}
                                {this.state.edit && <form onSubmit={e => this.handlePatchTemplate(e)}>
                                    <div className={styles.fieldSection}>
                                        <label htmlFor="template-name">Template Name: </label>
                                        <Input className={styles.input} type="text" name='template-name' id='template-name' defaultValue={this.state.currentTemplate.template_name} onChange={e => this.setState({ inputValues: {...this.state.inputValues, template_name: e.target.value }})}></Input>
                                    </div>
                                    <div className={styles.fieldSection}>
                                        <label htmlFor="template-subject">Subject: </label>
                                        <Input className={styles.input} type="text" name='template-subject' id='template-subject' defaultValue={this.state.currentTemplate.template_subject} onChange={e => this.setState({ inputValues: {...this.state.inputValues, template_subject: e.target.value }})}></Input>
                                    </div>
                                    <div className={`${styles.fieldSection} ${styles.textAreaSection}`}>
                                        <label  className={styles.textAreaLabel} htmlFor="template-body">Body: </label>
                                        <Textarea className={styles.textArea} name="template-body" id="template-body" defaultValue={this.state.currentTemplate.template_content} onChange={e => this.setState({ inputValues: {...this.state.inputValues, template_content: e.target.value }})}></Textarea>
                                    </div>
                                    <div>
                                        <Button onClick={e => this.closeEmailEdit(e)}>Cancel</Button>
                                        <Button type='submit'>Save</Button>
                                    </div>
                                </form> }
                            </div>
                            </div>)}
                        <Link to='/new-template'><Button className={styles.newButton}>+ New Template</Button></Link>
                    </div>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}