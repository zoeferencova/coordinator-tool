import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import EmailTemplate from '../../components/EmailTemplate/EmailTemplate'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom';
import './EmailPage.css'

const dummyTemplates = [
    {
        id: 1,
        template_name: 'Template Name',
        template_subject: 'Hello There!',
        template_body: 'To whom this may concern, Blah blah blah'
    },
    {
        id: 2,
        template_name: 'Template Name',
        template_subject: 'Hello There!',
        template_body: 'To whom this may concern, Blah blah blah'
    },
    {
        id: 3,
        template_name: 'Template Name',
        template_subject: 'Hello There!',
        template_body: 'To whom this may concern, Blah blah blah'
    },
]

export default class EmailPage extends React.Component {
    renderTemplates() {
        return dummyTemplates.map(template => 
            <EmailTemplate
                key={template.id}
                template_name={template.template_name}
                template_subject={template.template_subject}
                template_body={template.template_body}
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