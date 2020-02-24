import React from 'react';
import styles from './NewTemplateForm.module.css';

export default class NewTemplateForm extends React.Component {
    
    
    render() {
        return (
            <main>
                <form onSubmit={e => this.handlePostTemplate(e)}>
                    <h3>New Template Form</h3>
                    <div>
                        <label htmlFor="template_name">Name: </label>
                        <input type="text" class="block" id="template_name"></input>
                    </div>
                    <div>
                        <label htmlFor="template_subject">Subject: </label>
                        <input type="text" class="block" id="template_subject"></input>
                    </div>
                    <div>
                        <label htmlFor="template_body">Body: </label>
                        <textarea name="template_body" id="template_body" cols="100" rows="30"></textarea>
                    </div>
                    <button>Cancel</button>
                    <button type="submit">Save Template</button>
                </form>
            </main> 
        )
    }
}