import React from 'react';
import styles from './TemplateTab.module.css'

const TemplateTab = ({ selectTemplate, template, current }) => (
    <div>
        <div className={`${styles.templateItem} ${current === template.id ? styles.current : ''}`} onClick={() => selectTemplate(template.id)}>
            {template.template_name}
        </div>
    </div>
)

export default TemplateTab;