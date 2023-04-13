import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/contexts'
import { ButtonDark, ButtonLight, Input, Textarea, Error } from '../../components/Utils/Utils'

import styles from './NewTemplatePage.module.css';
import TemplateService from '../../services/template-service';

const NewTemplatePage = ({ onboarding }) => {
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
                if (res.error.message === "Missing 'template_name' in request body") {
                    setError("Missing template name")
                } else if (res.error.message === "Missing 'template_subject' in request body") {
                    setError("Missing template subject")
                } else if (res.error.message === "Missing 'template_content' in request body") {
                    setError("Missing template body")
                } else {
                    setError(res.error.message)
                }
            })
    }

    const handlePostSuccess = template => {
        context.addTemplate(template)
        navigate('/templates')
    }

    return (
        <div className={`container ${onboarding ? styles.onboardingOpen : ""}`}>
            <main className="content">
                <form className="form" onSubmit={e => handlePostTemplate(e)}>
                    <h2>New Template</h2>
                    {error && <Error style={{ marginRight: "25px", marginLeft: "25px" }} error={error} />}

                    <div className="form-item">
                        <label htmlFor="template_name">Name</label>
                        <Input type="text" name='template_name' id='template_name'></Input>
                    </div>
                    <div className="form-item">
                        <label htmlFor="template_subject">Subject</label>
                        <Input type="text" name='template_subject' id='template_subject'></Input>
                    </div>
                    <br></br>
                    <div className="form-item">
                        <label htmlFor="template_content">Body</label>
                        <Textarea name="template_content" id="template_content"></Textarea>
                    </div>
                    <p className={styles.instructions}>Note: For template functionality, use [CONTACT] for contact name, [PROJECT] for project name, and [PM] for PM name.</p>
                    <div className="form-buttons">
                        <Link to='/templates'><ButtonLight>Cancel</ButtonLight></Link>
                        <ButtonDark type='submit'>Create Template</ButtonDark>
                    </div>
                </form>

            </main>
        </div>
    )
}

export default NewTemplatePage;