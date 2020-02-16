import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import config from '../../config'
import AppContext from '../../contexts/contexts'
import './NewTemplatePage.css';

export default class NewTemplatePage extends React.Component {
    static contextType = AppContext;

    state = {
        error: null
    }
    
    handlePostTemplate(e) {
        e.preventDefault();
        const template_name = e.target.template_name.value;
        const template_subject = e.target.template_subject.value;
        const template_content = e.target.template_content.value;
        
        const template = { template_name, template_subject, template_content }
        console.log(template)
        return fetch(`${config.API_ENDPOINT}/templates`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(template)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(template => this.handlePostSuccess(template))
            .catch(res => {
                this.setState({ error: res.error.message })
            })
    }

    handlePostSuccess = template => {
        this.context.addTemplate(template)
        this.props.history.push('/email')
    }
    
    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='New Template' />
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={e => this.handlePostTemplate(e)}>
                        <div>
                            <label htmlFor="template_name">Template Name: </label>
                            <input type="text" name='template_name' id='template_name'></input>
                        </div>
                        <div>
                            <label htmlFor="template_subject">Subject: </label>
                            <input type="text" name='template_subject' id='template_subject'></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="template_content">Body: </label>
                            <textarea name="template_content" id="template_content" cols="100" rows="30"></textarea>
                        </div>
                        <div>
                            <Link to='/email'><button>Cancel</button></Link>
                            <button type='submit'>Create Template</button>
                        </div>
                    </form>

                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}