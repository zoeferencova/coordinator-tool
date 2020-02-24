import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import config from '../../config'

import styles from './AccountPage.module.css'

export default class AccountPage extends React.Component {
    static contextType = AppContext;

    state = {
        error: null
    }
    
    renderPms() {
        return this.context.pms.map(pm => 
            <li key={pm.id}>{pm.pm_name} - <span>{pm.pm_email} </span> <button onClick={e => this.handleDeletePm(e)} pmid={pm.id}>Delete</button></li>
        )
    }

    handleDeletePm(e) {
        e.preventDefault();
        const pmId = ReactDOM.findDOMNode(e.target).getAttribute('pmid')
        fetch(`${config.API_ENDPOINT}/pms/${pmId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            }
        })
        this.context.deletePm(pmId)
    }

    handlePostPm(e) {
        e.preventDefault();
        const pm_name = e.target.pm_name.value;
        const pm_email = e.target.pm_email.value;
        
        const pm = { pm_name, pm_email }
        return fetch(`${config.API_ENDPOINT}/pms`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
            },
            body: JSON.stringify(pm)
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(pm => this.handlePostSuccess(pm))
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    handlePostSuccess = pm => {
        this.context.addPm(pm)
        document.getElementById('pm_name').value = ''
        document.getElementById('pm_email').value = ''
        this.setState({ error: null })
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Account'} />
                    <section>
                        <h2>Account Info</h2>
                        <p><strong>Name:</strong> {this.context.user.full_name}</p>
                        <p><strong>Email:</strong> {this.context.user.email}</p>
                    </section>
                    <section>
                        <h2>PM Settings</h2>
                        <h3>Current PMs:</h3>
                        <ul className={styles.pmList}>
                            {this.renderPms()}
                        </ul>
                        {this.state.error && <p>{this.state.error}</p>}
                        <form onSubmit={e => this.handlePostPm(e)}>
                            <div>
                                <label htmlFor="pm_name">Name: </label>
                                <input type="text" id="pm_name"></input>
                            </div>
                            <div>
                                <label htmlFor="pm_email">Email: </label>
                                <input type="text" id="pm_email"></input>
                            </div>
                            <button type="submit">Add PM</button>
                        </form>
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}