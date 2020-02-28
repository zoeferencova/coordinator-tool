import React from 'react';
import AppContext from '../../contexts/contexts'
import { Select, Input } from '../Utils/Utils'

import styles from './SendEmailForm.module.css'

export default class SendEmailForm extends React.Component {
    static contextType = AppContext;

    state = {
        selectedTemplate: '',
        doctor: false
    }

    renderTemplateSelect = () => {
        const templateArray = this.context.templates.map((template, i) => {
           return  <option key={i} value={i}>{template.template_name}</option>
        })

        return templateArray;
    }

    handleSelectChange = (event) => {
        this.setState({ selectedTemplate: event.target.value })
    }

    formatTemplateBody = () => {
        const unformattedTemplate = this.context.templates[this.state.selectedTemplate].template_content;
        const { project, advisor, pm_name } = this.props;
        const splitAdvisor = advisor.split(' ')
        const numOfAdvisorNames = splitAdvisor.length;
        const formattedTemplate = unformattedTemplate.replace('[PROJECT]', project).replace('[PM]', pm_name).replace('[ADVISOR]', this.state.doctor ? `Dr. ${splitAdvisor[numOfAdvisorNames - 1]}` : splitAdvisor[0]);
        return formattedTemplate;
    }

    formatTemplateForEmail = () => {
        const regularFormattedTemplate = this.formatTemplateBody()
        return regularFormattedTemplate.replace(/\n/g, '%0A')
    }

    setDoctor = () => {
        !this.state.doctor 
            ? this.setState({ doctor: true })
            : this.setState({ doctor: false })
    }
    
    render() {
        return (
            <div >
                
                <main role="main" className={styles.formContainer}>
                    <div>
                        <button onClick={this.props.closeEmailForm}  className={styles.xButton}><i className="fas fa-times"></i></button>
                        <h3 className={styles.title}>Send Email</h3>
                    </div>
                    <form>
                        <div>
                            <label htmlFor="template">Template: </label>
                            <Select name="template" id="template" onChange={this.handleSelectChange}>
                                <option></option>
                                {this.renderTemplateSelect()}
                            </Select>
                        </div>
                        <div className={styles.doctor}>
                            <label htmlFor="doctor">Doctor: </label>
                            <input type="checkbox" id="doctor" onChange={this.setDoctor}></input>
                        </div>
                        <div>
                            {this.state.selectedTemplate !== '' && <h4 className={styles.preview}>Preview:</h4>}
                            <p className={styles.templateBody}>{this.state.selectedTemplate !== '' ? this.formatTemplateBody() : ''}</p>
                        </div>
                        
                        {this.state.selectedTemplate !== '' && <a href={`mailto:?Subject=${this.state.selectedTemplate !== '' ? this.context.templates[this.state.selectedTemplate].template_subject : ''}&Body=${this.state.selectedTemplate !== '' ? this.formatTemplateForEmail() : ''}`} className={styles.link}>Open in Outlook</a>}
                    </form>
                </main>
                <div className={styles.overlay} onClick={this.props.closeEmailForm}></div>
            </div>
        )
    }
}