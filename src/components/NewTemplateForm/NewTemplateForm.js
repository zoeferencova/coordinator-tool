import React from 'react';
import { Button, Textarea, Input } from '../Utils/Utils'

import styles from './NewTemplateForm.module.css';

export default class NewTemplateForm extends React.Component {
    
    
    render() {
        return (
            <main>
                <form onSubmit={e => this.handlePostTemplate(e)}>
                    <h3>New Template Form</h3>
                    <div>
                        <label htmlFor="template_name">Name: </label>
                        <Input type="text" class="block" id="template_name"></Input>
                    </div>
                    <div>
                        <label htmlFor="template_subject">Subject: </label>
                        <Input type="text" class="block" id="template_subject"></Input>
                    </div>
                    <div>
                        <label htmlFor="template_body">Body: </label>
                        <Textarea name="template_body" id="template_body" cols="100" rows="30"></Textarea>
                    </div>
                    <Button>Cancel</Button>
                    <Button type="submit">Save Template</Button>
                </form>
            </main> 
        )
    }
}