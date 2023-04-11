import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { ButtonLight, ButtonDark, Input, Textarea } from '../Utils/Utils';
import TemplateService from '../../services/template-service';
import styles from './TemplateEditForm.module.css'

const TemplateEditForm = ({ currentTemplate, setCurrentTemplate, inputValues, setInputValues, setEdit }) => {
    const context = useContext(AppContext)

    const handlePatchTemplate = e => {
        e.preventDefault()
        TemplateService.updateTemplate(inputValues, currentTemplate.id)
            .then(res => {
                context.updateTemplate(inputValues)
                closeEdit()
            })
            .then(res => setCurrentTemplate(inputValues))
    }

    const closeEdit = () => {
        setEdit(false);
        setInputValues({})
    }

    return (
        <form onSubmit={e => handlePatchTemplate(e)}>
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
                <ButtonLight onClick={closeEdit}>Cancel</ButtonLight>
                <ButtonDark type='submit'>Save</ButtonDark>
            </div>
        </form>
    )
}

export default TemplateEditForm;