import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import EmailTemplateWindow from '../../components/EmailTemplateWindow/EmailTemplateWindow'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import Button from '../../components/Utils/Utils'
import { Link } from 'react-router-dom';

import styles from './EmailPage.module.css'

export default class EmailPage extends React.Component {
    static contextType = AppContext;

    state = {
        currentTemplate: this.context.templates[0],
    }
    

    renderTemplateTabs() {
        return this.context.templates.map(template => 
            <EmailTemplate
                key={template.id}
                id={template.id}
                template_name={template.template_name}
                template_subject={template.template_subject}
                template_content={template.template_content}
                selectTemplate={this.selectTemplate}
            />
        )
    }

    selectTemplate = id => {
        const currentTemplate = this.context.templates.find(template => template.id === id)
        this.setState({ currentTemplate })
    }

    renderTemplateContent() {
        const { id, template_name, template_subject, template_content } = this.state.currentTemplate;
        return (
            <EmailTemplateWindow 
                id={id}
                template_name={template_name}
                template_subject={template_subject}
                template_content={template_content}
            />
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Email Templates'} />
                    <div className={styles.pageContainer}>
                        <div className={styles.templateContainer}>
                            <div className={styles.templateList}>
                                {this.renderTemplateTabs()}
                            </div>
                            <div className={styles.templateWindow}>
                                {this.state.currentTemplate !== undefined && this.renderTemplateContent()}
                            </div>
                        </div>
                        <Link to='/new-template'><Button>New Template</Button></Link>
                    </div>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}