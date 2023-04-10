import React, { useContext, useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import TemplateTab from '../../components/TemplateTab/TemplateTab'
import TemplateWindow from '../../components/TemplateWindow/TemplateWindow'
import TemplateEditForm from '../../components/TemplateEditForm/TemplateEditForm'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Button, Select } from '../../components/Utils/Utils'
import { Link } from 'react-router-dom';

import styles from './TemplatePage.module.css'
import listStyles from '../MainListPage/MainListPage.module.css'
import TemplateService from '../../services/template-service';

const EmailPage = () => {
    const context = useContext(AppContext);
    const [currentTemplate, setCurrentTemplate] = useState(undefined);
    const [edit, setEdit] = useState(false);
    const [inputValues, setInputValues] = useState({})

    useEffect(() => {
        setCurrentTemplate(context.templates[0])
    }, [context.templates])

    const selectTemplate = id => {
        const foundTemplate = context.templates.find(template => template.id === id)
        setCurrentTemplate(foundTemplate)
        setInputValues(foundTemplate)
    }

    const handleDeleteTemplate = () => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            TemplateService.deleteTemplate(currentTemplate.id)
            context.deleteTemplate(currentTemplate.id)
            setCurrentTemplate(context.templates[0])
        }
    }

    const handleTemplateSelect = val => {
        const foundTemplate = context.templates.find(template => +template.id === +val)
        setCurrentTemplate(foundTemplate)
        setInputValues(foundTemplate)
    }

    //Instructions for how to get started with templates
    //Rendered if no templates are currently saved for user
    const templateInstructions = (
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

    return (
        <div className="container">
            <main className="content">
                <Header title={'Email Templates'} />
                <div className={styles.pageContainer}>
                    {context.templates.length === 0 ? templateInstructions :
                        (<div className={styles.templateContainer}>
                            <div className={styles.templateList}>
                                {context.templates.map(template => <TemplateTab key={template.id} template={template} selectTemplate={selectTemplate} current={currentTemplate !== undefined ? currentTemplate.id : undefined} />)}
                            </div>
                            <div className={styles.templateSelect}>
                                <Select onChange={(e) => handleTemplateSelect(e.target.value)} defaultValue={currentTemplate !== undefined ? currentTemplate.id : ''}>
                                    <option value=''></option>
                                    {context.templates.map(template => <option value={template.id} key={template.id}> {template.template_name} </option>)}
                                </Select>
                            </div>
                            <div className={styles.templateWindow}>
                                {currentTemplate !== undefined && !edit && <>
                                    <div className={styles.templateHeader}>
                                        <h3>{currentTemplate.template_name}</h3>
                                        <div>
                                            <Button onClick={() => setEdit(true)}>Edit</Button>
                                            <Button onClick={handleDeleteTemplate}>Delete</Button>
                                        </div>
                                    </div>
                                    <TemplateWindow
                                        id={currentTemplate.id}
                                        template_name={currentTemplate.template_name}
                                        template_subject={currentTemplate.template_subject}
                                        template_content={currentTemplate.template_content}
                                    /></>}
                                {edit && <TemplateEditForm currentTemplate={currentTemplate} inputValues={inputValues} setInputValues={setInputValues} setEdit={setEdit} setCurrentTemplate={setCurrentTemplate} />}
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