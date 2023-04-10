import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { Button, Input, Textarea } from '../Utils/Utils';
import TemplateService from '../../services/template-service';
import styles from './TemplateEditForm.module.css'

const TemplateEditForm = ({ currentTemplate, setCurrentTemplate, inputValues, setInputValues, setEdit }) => {
    const context = useContext(AppContext)

    const handlePatchTemplate = e => {
        e.preventDefault()
        TemplateService.updateTemplate(inputValues, inputValues.id)
            .then(res => context.updateTemplate(inputValues))
            .then(res => {
                setCurrentTemplate(inputValues)
                closeEdit()
            })
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
                <Button onClick={closeEdit}>Cancel</Button>
                <Button type='submit'>Save</Button>
            </div>
        </form>
    )
}

export default TemplateEditForm;