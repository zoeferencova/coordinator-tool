import React, { useContext, useState, useEffect } from 'react';
import TemplateTab from '../../components/TemplateTab/TemplateTab'
import TemplateWindow from '../../components/TemplateWindow/TemplateWindow'
import TemplateEditForm from '../../components/TemplateEditForm/TemplateEditForm'
import AppContext from '../../contexts/contexts'
import { ButtonDark, CustomSelect, editIcon, trashIcon, plusIcon, ActionButton } from '../../components/Utils/Utils'
import { Link } from 'react-router-dom';

import styles from './TemplatePage.module.css'
import listStyles from '../MainListPage/MainListPage.module.css'
import TemplateService from '../../services/template-service';

const EmailPage = () => {
    const context = useContext(AppContext);
    const [currentTemplate, setCurrentTemplate] = useState(undefined);
    const [edit, setEdit] = useState(false);
    const [inputValues, setInputValues] = useState(undefined)

    useEffect(() => {
        if (!currentTemplate) {
            setCurrentTemplate(context.templates[0])
            setInputValues(context.templates[0])
        }
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

    const templateOptions = context.templates.map(template => ({ value: template.id, label: template.template_name }))

    return (
        <div className="container">
            <main className="content">
                <div className={styles.pageContainer}>
                    <h2 className={styles.pageHeader}>Email Templates</h2>
                    <div className={styles.templateContainer}>

                        <div className={styles.templateList}>
                            <Link to='/new-template'><ButtonDark className={styles.newButton}>New Template</ButtonDark></Link>
                            <h3 className={styles.listHeader}>My Templates</h3>
                            {context.templates.map(template => <TemplateTab key={template.id} template={template} selectTemplate={selectTemplate} current={currentTemplate !== undefined ? currentTemplate.id : undefined} />)}
                        </div>
                        <div className={styles.templateSelect}>
                            {/* <Select onChange={(e) => handleTemplateSelect(e.target.value)} value={currentTemplate !== undefined ? currentTemplate.id : ''}>
                                    {context.templates.map(template => <option value={template.id} key={template.id}> {template.template_name} </option>)}
                                </Select> */}
                            <CustomSelect name="pm" id="pm" onChange={(e) => handleTemplateSelect(e.value)} options={templateOptions} value={currentTemplate !== undefined ? currentTemplate.id : null} width="240px" />

                            <Link className={styles.desktopNewTemplate} to='/new-template'><ButtonDark className={styles.newButton}>New Template</ButtonDark></Link>
                            <Link className={styles.mobileNewTemplate} to='/new-template'><ButtonDark className={styles.newButton}>{plusIcon}</ButtonDark></Link>
                        </div>

                        {currentTemplate !== undefined && !edit && <div className={styles.templateWindow}>
                            <div className={styles.templateHeader}>
                                <h3>{currentTemplate.template_name}</h3>
                                <div className={styles.templateButtons}>
                                    <ActionButton action="edit" onClick={() => setEdit(true)}>{editIcon}Edit</ActionButton>
                                    <ActionButton action="delete" onClick={handleDeleteTemplate}>{trashIcon}Delete</ActionButton>
                                </div>
                            </div>
                            <TemplateWindow
                                id={currentTemplate.id}
                                template_name={currentTemplate.template_name}
                                template_subject={currentTemplate.template_subject}
                                template_content={currentTemplate.template_content}
                            /></div>
                        }
                        {edit && <TemplateEditForm currentTemplate={currentTemplate} inputValues={inputValues} setInputValues={setInputValues} setEdit={setEdit} setCurrentTemplate={setCurrentTemplate} />}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EmailPage;