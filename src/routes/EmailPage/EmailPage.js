import React, { useContext, useState } from 'react';
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

const EmailPage = () => {
    const context = useContext(AppContext);
    const [currentTemplate, setCurrentTemplate] = useState(context.templates[0]);
    const [edit, setEdit] = useState(false);
    const [inputValues, setInputValues] = useState({})

    //Renders tabs used to select template
    const renderTemplateTabs = () => (
        context.templates.map(template =>
            <EmailTemplate
                key={template.id}
                id={template.id}
                template_name={template.template_name}
                template_subject={template.template_subject}
                template_content={template.template_content}
                selectTemplate={selectTemplate}
                current={currentTemplate !== undefined ? currentTemplate.id : undefined}
            />
        ))

    //Renders select for templates, only visible for mobile
    const renderTemplateSelect = () => {
        return context.templates.map(template =>
            <option value={template.id} key={template.id}>
                {template.template_name}
            </option>
        )
    }

    const selectTemplate = id => {
        const foundTemplate = context.templates.find(template => template.id === id)
        setCurrentTemplate(foundTemplate)
        setInputValues(foundTemplate)
    }

    const renderTemplateContent = () => {
        const { id, template_name, template_subject, template_content } = currentTemplate;
        return (
            <EmailTemplateWindow
                id={id}
                template_name={template_name}
                template_subject={template_subject}
                template_content={template_content}
            />
        )
    }

    const handleDeleteTemplate = () => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            fetch(`${config.API_ENDPOINT}/templates/${currentTemplate.id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                }
            })
            context.deleteTemplate(currentTemplate.id)
            setCurrentTemplate(context.templates[0])
        }
    }

    const handlePatchTemplate = e => {
        e.preventDefault()
        fetch(`${config.API_ENDPOINT}/templates/${inputValues.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(inputValues)
        })
            .then(res => context.updateTemplate(inputValues))
            .then(res => {
                setEdit(false);
                setCurrentTemplate(inputValues)
            })
    }

    const closeEmailEdit = () => {
        setEdit(false)
        setInputValues({})
    }

    const handleTemplateSelect = val => {
        const foundTemplate = context.templates.find(template => +template.id === +val)
        setCurrentTemplate(foundTemplate)
        setInputValues(foundTemplate)
    }

    //Instructions for how to get started with templates
    //Rendered if no templates are currently saved for user
    const renderTemplateInstructions = () => {
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

    return (
        <div className="container">
            <main className="content">
                <Header title={'Email Templates'} />
                <div className={styles.pageContainer}>
                    {context.templates.length === 0 ? renderTemplateInstructions() :
                        (<div className={styles.templateContainer}>
                            <div className={styles.templateList}>
                                {renderTemplateTabs()}
                            </div>
                            <div className={styles.templateSelect}>
                                <Select onChange={(e) => handleTemplateSelect(e.target.value)} defaultValue={currentTemplate !== undefined ? currentTemplate.id : ''}>
                                    <option value=''></option>
                                    {renderTemplateSelect()}
                                </Select>
                            </div>
                            <div className={styles.templateWindow}>
                                {currentTemplate !== undefined && !edit && <div className={styles.templateHeader}>
                                    <h3>{currentTemplate.template_name}</h3>
                                    <div>
                                        <Button onClick={() => setEdit(true)}>Edit</Button>
                                        <Button onClick={handleDeleteTemplate}>Delete</Button>
                                    </div>
                                </div>}
                                {(currentTemplate !== undefined && !edit) ? renderTemplateContent() : ''}
                                {edit && <form onSubmit={e => handlePatchTemplate(e)}>
                                    <div className={styles.fieldSection}>
                                        <label htmlFor="template-name">Template Name: </label>
                                        <Input className={styles.input} type="text" name='template-name' id='template-name' defaultValue={currentTemplate.template_name} onChange={e => setInputValues({ ...inputValues, template_name: e.target.value })}></Input>
                                    </div>
                                    <div className={styles.fieldSection}>
                                        <label htmlFor="template-subject">Subject: </label>
                                        <Input className={styles.input} type="text" name='template-subject' id='template-subject' defaultValue={currentTemplate.template_subject} onChange={e => setInputValues({ ...inputValues, template_subject: e.target.value })}></Input>
                                    </div>
                                    <div className={`${styles.fieldSection} ${styles.textAreaSection}`}>
                                        <label className={styles.textAreaLabel} htmlFor="template-body">Body: </label>
                                        <Textarea className={styles.textArea} name="template-body" id="template-body" defaultValue={currentTemplate.template_content} onChange={e => setInputValues({ ...inputValues, template_content: e.target.value })}></Textarea>
                                    </div>
                                    <div>
                                        <Button onClick={closeEmailEdit}>Cancel</Button>
                                        <Button type='submit'>Save</Button>
                                    </div>
                                </form>}
                            </div>
                        </div>)}
                    <Link to='/new-template'><Button className={styles.newButton}>+ New Template</Button></Link>
                </div>
            </main>
            <NavBar className="nav" />
        </div>
    )
}

export default EmailPage;