import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/contexts'
import { Select } from '../Utils/Utils'
import TemplateService from '../../services/template-service';

import listStyles from '../../routes/MainListPage/MainListPage.module.css'
import styles from './SendEmailForm.module.css'

const SendEmailForm = ({ data, closeEmailForm }) => {
    const context = useContext(AppContext);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [doctor, setDoctor] = useState(false);

    const templateSelect = context.templates.map((template, i) => <option key={i} value={i}>{template.template_name}</option>)

    const currentTemplate = context.templates[selectedTemplate];
    const emailHref = `mailto:?Subject=${selectedTemplate !== '' ? TemplateService.formatTemplate(currentTemplate.template_content, currentTemplate.template_subject, data, doctor)[1] : ''}&Body=${selectedTemplate !== '' ? TemplateService.formatTemplateForEmail(currentTemplate.template_content, currentTemplate.template_subject, data, doctor) : ''}`

    return (
        <div>
            <main role="main" className={styles.formContainer}>
                <div className={styles.header}>
                    <button onClick={closeEmailForm} className={styles.xButton}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                {context.templates.length === 0 ?
                    <p>You have no templates saved! You can create new templates in the
                        <span className={listStyles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</p>
                    :
                    <form>
                        <div>
                            <label htmlFor="template">Template: </label>
                            <Select name="template" id="template" onChange={e => setSelectedTemplate(e.target.value)}>
                                <option></option>
                                {templateSelect}
                            </Select>
                        </div>
                        <div className={styles.doctor}>
                            <label htmlFor="doctor">Doctor: </label>
                            <input type="checkbox" id="doctor" onChange={() => setDoctor(!doctor)}></input>
                        </div>
                        <div className={styles.templateContainer}>
                            <h2 className={styles.templateSubject}>{selectedTemplate !== '' && currentTemplate.template_subject}</h2>
                            <p className={styles.templateBody}>{selectedTemplate !== '' ? TemplateService.formatTemplate(currentTemplate.template_content, currentTemplate.template_subject, data, doctor)[0].replace('%26', '&') : ''}</p>
                        </div>

                        {selectedTemplate !== '' && <a target="_blank" rel="noopener noreferrer" href={emailHref} className={styles.link}>Open Email</a>}
                    </form>}
            </main>
            <div className={styles.overlay} onClick={closeEmailForm}></div>
        </div>
    )
}

export default SendEmailForm;