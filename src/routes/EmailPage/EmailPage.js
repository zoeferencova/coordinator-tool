import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import { Link } from 'react-router-dom';

import styles from './EmailPage.module.css'

export default class EmailPage extends React.Component {
    static contextType = AppContext;

    renderTemplates() {
        return this.context.templates.map(template => 
            <EmailTemplate
                key={template.id}
                id={template.id}
                template_name={template.template_name}
                template_subject={template.template_subject}
                template_content={template.template_content}
            />
        )
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Email Templates'} />
                    {this.renderTemplates()}<br></br>
                    <Link to='/new-template'><button>New Template</button></Link>
                    
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}