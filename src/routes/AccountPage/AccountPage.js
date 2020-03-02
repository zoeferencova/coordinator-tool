import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import { Button, Input } from '../../components/Utils/Utils'

import config from '../../config'

import styles from './AccountPage.module.css'
import modalStyles from '../../components/SendEmailForm/SendEmailForm.module.css'
import listStyles from '../MainListPage/MainListPage.module.css'

export default class AccountPage extends React.Component {
    static contextType = AppContext;

    state = {
        error: null,
        confirm: false,
        userGuide: false
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

    closeInstructions = () => {
        this.setState({ userGuide: false })
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
                            <Button onClick={() => this.setState({ userGuide: true })}>User Guide</Button>
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
                    {this.state.userGuide ? (<div>
                        <div className={`${modalStyles.formContainer} ${styles.guideContainer}`}>
                            <button onClick={this.closeInstructions}  className={modalStyles.xButton}><i className="fas fa-times"></i></button>
                            <div className={styles.instructionContent}>
                                <h3 className={modalStyles.title}>User Guide</h3>
                                <div className={`${listStyles.instructions}`}>
                                    <p>Welcome to the coordinator tool! Here's how to get started:</p>
                                    <ol>
                                        <li>Add your Project Manager names and emails in the <span className={listStyles.tabStyle}><i className="fas fa-user-circle"></i> Account</span> tab PM Settings section.</li>
                                        <li>Create some email templates in the <span className={listStyles.tabStyle}><i className="fas fa-envelope"></i> Templates</span> tab.</li>
                                        <li>Add your first list item! Use the <span className={listStyles.addButtonStyle}>+ Add Item</span> button to start adding list items. You can include URL's for the CRM advisor or project page which will link the list item values to the external pages for quick navigation in the future.</li>
                                        <li>Other tips:</li>
                                            <ul>
                                                <li>Use the <span className={listStyles.buttonStyle}>PM Update</span> button to automatically generate an email with all of your current list items categorized by PM. This can be used to send an update email to all of your PM's whenever you need to.</li>
                                                <li>The <span className={listStyles.buttonStyle}>Reset</span> button can be used to reset the status of all of the list items back to no status. You can use this in the beginning of the day to mark all items as no longer pending from the previous day.</li>
                                                <li>When you mark a list item completed, it will automatically get moved into the <span className={listStyles.tabStyle}><i className="fas fa-check-square"></i> Completed</span> tab where you can revert the status of any completed item if needed and move it back into your main list.</li>
                                                <li>Use the <span className={listStyles.tabStyle}><i className="fas fa-chart-pie"></i> Dashboard</span> tab to keep track of metrics and gain insight into trends related to your workflow.</li>
                                            </ul>
                                    </ol>
                                </div>
                            </div>
                            
                        </div>
                        <div className={modalStyles.overlay} onClick={this.closeInstructions}></div>
                    </div>) : ''}
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}