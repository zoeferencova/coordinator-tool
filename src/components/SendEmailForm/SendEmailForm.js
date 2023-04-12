import React, { useState, useContext } from 'react';
import AppContext from '../../contexts/contexts'
import { ButtonDark, CustomSelect, closeIcon } from '../Utils/Utils'
import TemplateService from '../../services/template-service';

import listStyles from '../../routes/MainListPage/MainListPage.module.css'
import styles from './SendEmailForm.module.css'

const SendEmailForm = ({ data, closeEmailForm }) => {
    const context = useContext(AppContext);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [doctor, setDoctor] = useState(false);

    const selectOptions = context.templates.map((template, i) => ({ value: i, label: template.template_name }))

    const currentTemplate = context.templates[selectedTemplate];
    const emailHref = `mailto:?Subject=${selectedTemplate !== '' ? TemplateService.formatTemplate(currentTemplate.template_content, currentTemplate.template_subject, data, doctor)[1] : ''}&Body=${selectedTemplate !== '' ? TemplateService.formatTemplateForEmail(currentTemplate.template_content, currentTemplate.template_subject, data, doctor) : ''}`

    return (
        <div>
            <main role="main" className={styles.formContainer}>
                <div className={styles.header}>
                    <button onClick={closeEmailForm} className={styles.xButton}>
                        {closeIcon}
                    </button>
                </div>
                {context.templates.length === 0 ?
                    <p>You have no templates saved! You can create new templates in the
                        <span className={listStyles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</p>
                    :
                    <>
                        <form className='form no-container' style={{ height: "fit-content" }}>
                            <h2>Send Email</h2>
                            <div className="form-item">
                                <label htmlFor="template">Template</label>
                                <CustomSelect name="template" id="template" onChange={e => setSelectedTemplate(e.value)} options={selectOptions} />
                            </div>
                            <div className={`${styles.doctor} form-item`}>
                                <input type="checkbox" id="doctor" onChange={() => setDoctor(!doctor)}></input>
                                <label htmlFor="doctor">Doctor</label>
                            </div>
                        </form>
                        <div className={styles.templateContainer}>
                            {!selectedTemplate && <span className={styles.selectMessage}>Select a template</span>}
                            {selectedTemplate !== '' && <h2 className={styles.templateSubject}>{currentTemplate.template_subject}</h2>}
                            {selectedTemplate !== '' && <p className={styles.templateBody}>{TemplateService.formatTemplate(currentTemplate.template_content, currentTemplate.template_subject, data, doctor)[0].replace('%26', '&')}</p>}
                        </div>
                        {selectedTemplate !== '' && <div className={styles.buttonSection}><a target="_blank" rel="noopener noreferrer" href={emailHref} className={styles.link}><ButtonDark>Open Email</ButtonDark></a></div>}


                    </>
                }
            </main>
            <div className={styles.overlay} onClick={closeEmailForm}></div>
        </div>
    )
}

export default SendEmailForm;