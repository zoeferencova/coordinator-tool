import React from 'react';
import AppContext from '../../contexts/contexts'
import { Select } from '../Utils/Utils'

import listStyles from '../../routes/MainListPage/MainListPage.module.css'
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

    //Gets current selected template from context and replaces values of template strings [PROJECT], [CONTACT] and [PM] with values from the listItem that are passed in as props
    //Returns array with format [[formatted template content], [formatted template subject]]
    formatTemplate = () => {
        const unformattedTemplate = this.context.templates[this.state.selectedTemplate].template_content;
        const unformattedSubject = this.context.templates[this.state.selectedTemplate].template_subject;
        const { project, contact, pm_name } = this.props;
        const fixedproject = project.replace('&', '%26')
        const splitWord = word => word.split(' ');
        const numWords = word => splitWord(word).length;
        const arr = [unformattedTemplate, unformattedSubject]
        const formattedArr = arr.map(item => item.replace('[PROJECT]', (splitWord(fixedproject)[numWords(fixedproject) - 1] === 'Space' || splitWord(fixedproject)[numWords(fixedproject) - 1] === 'Industry') ? `the ${fixedproject}` : fixedproject).replace('[PM]', pm_name).replace('[CONTACT]', this.state.doctor ? `Dr. ${splitWord(contact)[numWords(contact) - 1]}` : splitWord(contact)[0]));
        return formattedArr;
    }

    //Replaces characters used for new line to be compatible with mailto
    formatTemplateForEmail = () => {
        const template = this.formatTemplate()[0]
        return template.replace(/\n/g, '%0D%0A')
    }

    //Used for 'Set Doctor' checkbox
    //If doctor state is true, the formatTemplate function replaces [CONTACT] with `Dr. [contact last name]` instead of [contact first name]
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
                    {this.context.templates.length === 0 ? <p>You have no templates saved! You can create new templates in the <span className={listStyles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</p> :
                    (<form>
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
                            <p className={styles.templateBody}>{this.state.selectedTemplate !== '' ? this.formatTemplate()[0].replace('%26', '&') : ''}</p>
                        </div>
                        
                        {this.state.selectedTemplate !== '' && <a target="_blank" rel="noopener noreferrer" href={`mailto:?Subject=${this.state.selectedTemplate !== '' ? this.formatTemplate()[1] : ''}&Body=${this.state.selectedTemplate !== '' ? this.formatTemplateForEmail() : ''}`} className={styles.link}>Open Email</a>}
                    </form>)}
                </main>
                <div className={styles.overlay} onClick={this.props.closeEmailForm}></div>
            </div>
        )
    }
}