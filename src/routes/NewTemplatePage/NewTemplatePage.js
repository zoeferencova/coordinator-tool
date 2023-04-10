import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import { Button, Input, Textarea } from '../../components/Utils/Utils'

import styles from './NewTemplatePage.module.css';
import TemplateService from '../../services/template-service';

const NewTemplatePage = () => {
    const context = useContext(AppContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePostTemplate = async e => {
        e.preventDefault();
        const template_name = e.target.template_name.value;
        const template_subject = e.target.template_subject.value;
        const template_content = e.target.template_content.value;

        const template = { template_name, template_subject, template_content }

        TemplateService.addTemplate(template)
            .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
            .then(newTemplate => handlePostSuccess(newTemplate))
            .catch(res => {
                setError(res.error.message)
            })
    }

    const handlePostSuccess = template => {
        context.addTemplate(template)
        navigate('/templates')
    }

    return (
        <div className="container">
            <main className="content">
                <Header title='New Template' />
                {error && <p>{error}</p>}
                <form onSubmit={e => handlePostTemplate(e)}>
                    <div>
                        <label htmlFor="template_name">Name: </label>
                        <Input type="text" name='template_name' id='template_name' className={styles.input}></Input>
                    </div>
                    <div>
                        <label htmlFor="template_subject">Subject: </label>
                        <Input type="text" name='template_subject' id='template_subject' className={styles.input}></Input>
                    </div>
                    <br></br>
                    <div className={styles.textAreaSection}>
                        <label htmlFor="template_content" className={styles.textAreaLabel}>Body: </label>
                        <Textarea name="template_content" id="template_content" className={styles.textArea}></Textarea>
                    </div>
                    <p className={styles.instructions}>Note: For template functionality, use [CONTACT] for contact name, [PROJECT] for project name, and [PM] for PM name.</p>
                    <div>
                        <Link to='/email'><Button>Cancel</Button></Link>
                        <Button type='submit'>Create Template</Button>
                    </div>
                </form>

            </main>
            <NavBar className="nav" />
        </div>
    )
}

export default NewTemplatePage;