import React from 'react';
import styles from './EmailTemplate.module.css'

const EmailTemplate = ({ id, selectTemplate, template_name, current }) => (
    <div>
        <div className={`${styles.templateItem} ${current === id ? styles.current : ''}`} onClick={() => selectTemplate(id)}>
            {template_name}
        </div>
    </div>
)

export default EmailTemplate;