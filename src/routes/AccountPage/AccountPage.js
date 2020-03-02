import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import { Button, Input } from '../../components/Utils/Utils'

import config from '../../config'

import styles from './AccountPage.module.css'

export default class AccountPage extends React.Component {
    static contextType = AppContext;

    state = {
        error: null,
        confirm: false,
    }
    
    renderPms() {
        return this.context.pms.map(pm => 
            <li key={pm.id} className = {styles.pmItem}>
                <div className={styles.pmDetails}>
                    <div className={styles.name}>{pm.pm_name}</div> 
                    <div className={styles.email}>{pm.pm_email}</div> 
                </div>
                <Button onClick={(e) => this.handleDeletePm(e) } pmid={pm.id} className={styles.delete}>Delete</Button>
            </li>
        )
    }
        

    close = () => {
        this.setState({ confirm: false })
    }

    open = () => {
        this.setState({ confirm: true })
    }

    handleDeletePm = (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you wish to delete this PM?')) {
            const pmId = ReactDOM.findDOMNode(e.target).getAttribute('pmid')
            fetch(`${config.API_ENDPOINT}/pms/${pmId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                }
            })
            this.context.deletePm(pmId)
        } else {
            return e
        }
        
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
                    <div className={styles.pageContainer}>
                        <section className={`${styles.accountInfo} ${styles.accountContainer}`}>
                            <h2>Account Info</h2>
                            <i className={`fas fa-user-circle ${styles.icon}`}></i>
                            <p className={styles.name}>{this.context.user.full_name}</p>
                            <p className={styles.email}>{this.context.user.email}</p>
                        </section>
                        <section className={`${styles.pmSettings} ${styles.accountContainer}`}>
                            <h2>PM Settings</h2>
                            {this.context.pms.length === 0 ? <p className={styles.addMessage}>Add PM's here!</p> : (<ul className={styles.pmList}>
                                {this.renderPms()}
                            </ul>)}
                            {this.state.error && <p>{this.state.error}</p>}
                            <form onSubmit={e => this.handlePostPm(e)} className={styles.addPm}>
                                <div>
                                    <label htmlFor="pm_name"></label>
                                    <Input type="text" id="pm_name" placeholder={"Name"}></Input>
                                </div>
                                <div>
                                    <label htmlFor="pm_email"></label>
                                    <Input type="text" id="pm_email" placeholder={"Email"}></Input>
                                </div>
                                <Button type="submit" className={styles.addButton}>+ Add PM</Button>
                            </form>
                        </section>
                    </div>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}