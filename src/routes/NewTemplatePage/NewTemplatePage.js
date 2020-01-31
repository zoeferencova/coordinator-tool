import React from 'react';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header'
import { Link } from 'react-router-dom'
import './NewTemplatePage.css';

export default class NewTemplatePage extends React.Component {
    render() {
        return (
            <div className="container">
                
                <main className="content">
                    <Header title='New Template' />
                    <form>
                        <div>
                            <label htmlFor="template-name">Template Name: </label>
                            <input type="text" name='template-name' id='template-name'></input>
                        </div>
                        <div>
                            <label htmlFor="template-subject">Subject: </label>
                            <input type="text" name='template-subject' id='template-subject'></input>
                        </div>
                        <br></br>
                        <div>
                            <label htmlFor="template-body">Body: </label>
                            <textarea name="template-body" id="template-body" cols="100" rows="30"></textarea>
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