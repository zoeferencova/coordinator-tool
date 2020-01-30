import React from 'react';
import './NewTemplateForm.css';

export default class NewTemplateForm extends React.Component {
    render() {
        return (
            <main>
                <form action="submit">
                    <h3>New Template Form</h3>
                    <div>
                        <label htmlFor="template-name">Name: </label>
                        <input type="text" class="block" id="template-name"></input>
                    </div>
                    <div>
                        <label htmlFor="template-subject">Subject: </label>
                        <input type="text" class="block" id="template-subject"></input>
                    </div>
                    <div>
                        <label htmlFor="template-body">Body: </label>
                        <textarea name="template-body" id="template-body" cols="100" rows="30"></textarea>
                    </div>
                    <button>Cancel</button>
                    <button type="submit">Save Template</button>
                </form>
            </main> 
        )
    }
}