
import React from 'react';
import styles from './EmailTemplateWindow.module.css'

const EmailTemplateWindow = ({ id, template_subject, template_content }) => (
    <div className={styles.box}>
        <div className={styles.templateContent} itemkey={id}>
            <p className={styles.templateSubject}>{template_subject}</p>
            <p className={styles.templateBody}>{template_content}</p>
        </div>
    </div>
)

export default EmailTemplateWindow;