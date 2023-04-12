import React, { useContext } from 'react';
import AppContext from '../../contexts/contexts';
import { ButtonLight, ButtonDark, Input, Textarea } from '../Utils/Utils';
import TemplateService from '../../services/template-service';

const TemplateEditForm = ({ currentTemplate, setCurrentTemplate, inputValues, setInputValues, setEdit }) => {
    const context = useContext(AppContext)

    const handlePatchTemplate = e => {
        e.preventDefault()
        TemplateService.updateTemplate(inputValues, currentTemplate.id)
            .then(res => {
                setCurrentTemplate(inputValues)
                setInputValues(inputValues)
                context.updateTemplate(inputValues)
                setEdit(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <form className="form" style={{ marginTop: 0 }} onSubmit={e => handlePatchTemplate(e)}>
            <h2>Edit Template</h2>
            <div className="form-item">
                <label htmlFor="template-name">Name</label>
                <Input type="text" name='template-name' id='template-name' defaultValue={currentTemplate.template_name} onChange={e => setInputValues({ ...inputValues, template_name: e.target.value })}></Input>
            </div>
            <div className="form-item">
                <label htmlFor="template-subject">Subject</label>
                <Input type="text" name='template-subject' id='template-subject' defaultValue={currentTemplate.template_subject} onChange={e => setInputValues({ ...inputValues, template_subject: e.target.value })}></Input>
            </div>
            <div className="form-item">
                <label htmlFor="template-body">Body</label>
                <Textarea name="template-body" id="template-body" defaultValue={currentTemplate.template_content} onChange={e => setInputValues({ ...inputValues, template_content: e.target.value })}></Textarea>
            </div>
            <div className="form-buttons">
                <ButtonLight onClick={() => setEdit(false)}>Cancel</ButtonLight>
                <ButtonDark type='submit'>Save</ButtonDark>
            </div>
        </form>
    )
}

export default TemplateEditForm;