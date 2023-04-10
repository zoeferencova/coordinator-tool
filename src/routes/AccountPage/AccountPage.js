import React, { useContext, useState } from 'react';
import Header from '../../components/Header/Header'
import AppContext from '../../contexts/contexts'
import NavBar from '../../components/NavBar/NavBar';
import { Button, Input, UserGuide, userIcon } from '../../components/Utils/Utils'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom';

import config from '../../config'

import styles from './AccountPage.module.css'
import modalStyles from '../../components/SendEmailForm/SendEmailForm.module.css'

const AccountPage = () => {
    const context = useContext(AppContext);
    const [error, setError] = useState(null);
    const [userGuide, setUserGuide] = useState(false);

    const renderPms = () => {
        return context.pms.map(pm =>
            <li key={pm.id} className={styles.pmItem}>
                <div className={styles.pmDetails}>
                    <div className={styles.name}>{pm.pm_name}</div>
                    <div className={styles.email}>{pm.pm_email}</div>
                </div>
                <Button onClick={(e) => handleDeletePm(e)} pmid={pm.id} className={styles.delete}>Delete</Button>
            </li>
        )
    }

    const handleDeletePm = e => {
        e.preventDefault();
        if (window.confirm('Are you sure you wish to delete this PM? All list items associated with this PM will also be deleted.')) {
            const pmId = e.target.getAttribute('pmid')
            fetch(`${config.API_ENDPOINT}/pms/${pmId}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                }
            })
            context.deletePm(pmId)
        }
    }

    const handlePostPm = async e => {
        e.preventDefault();
        const pm_name = e.target.pm_name.value;
        const pm_email = e.target.pm_email.value;

        const pm = { pm_name, pm_email }
        try {
            const res = await fetch(`${config.API_ENDPOINT}/pms`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
                },
                body: JSON.stringify(pm)
            });
            const newPm = await (
                (!res.ok)
                    ? res.json().then(err => Promise.reject(err))
                    : res.json());
            return handlePostSuccess(newPm);
        } catch (res_1) {
            setError(res_1.error);
        }
    }

    const handlePostSuccess = pm => {
        context.addPm(pm)
        document.getElementById('pm_name').value = ''
        document.getElementById('pm_email').value = ''
        setError(null)
    }

    //Clears Auth Token and sets App component's state isLoggedIn to false to render the UnauthenticatedApp component
    const handleLogout = () => {
        TokenService.clearAuthToken();
        context.setLoggedIn(false)
    }

    return (
        <div className="container">
            <main className="content">
                <Header title="Account" />
                <div className={styles.pageContainer}>
                    <section className={`${styles.accountInfo} ${styles.accountContainer}`}>
                        <h2>Account Info</h2>
                        {userIcon}
                        <p className={styles.name}>{context.user.full_name}</p>
                        <p className={styles.email}>{context.user.email}</p>
                        <Button onClick={() => setUserGuide(true)}>User Guide</Button>
                        <Link to='/'><Button onClick={handleLogout}>Log Out</Button></Link>
                    </section>
                    <section className={`${styles.pmSettings} ${styles.accountContainer}`}>
                        <h2>PM Settings</h2>
                        {context.pms.length === 0 ? <p className={styles.addMessage}>Add PM's here!</p> : (<ul className={styles.pmList}>
                            {renderPms()}
                        </ul>)}
                        {error && <p>{error}</p>}
                        <form onSubmit={e => handlePostPm(e)} className={styles.addPm}>
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
                {userGuide && <div>
                    <div className={`${modalStyles.formContainer} ${styles.guideContainer}`}>
                        <button onClick={() => setUserGuide(false)} className={modalStyles.xButton}><i className="fas fa-times"></i></button>
                        <div className={styles.instructionContent}>
                            <h3 className={modalStyles.title}>User Guide</h3>
                            <UserGuide />
                        </div>

                    </div>
                    <div className={modalStyles.overlay} onClick={() => setUserGuide(false)}></div>
                </div>}
            </main>
            <NavBar className="nav" />
        </div>
    )
}

export default AccountPage;