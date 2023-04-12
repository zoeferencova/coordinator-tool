import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/contexts';
import { ButtonDark, Input, plusIcon } from '../../components/Utils/Utils'
import PmItem from '../../components/PmItem/PmItem';

import styles from './PmSettings.module.css'
import PmService from '../../services/pm-service';

const PmSettings = ({ }) => {
    const context = useContext(AppContext);

    const [error, setError] = useState(null);

    const handlePostPm = async e => {
        e.preventDefault();
        const pm_name = e.target.pm_name.value;
        const pm_email = e.target.pm_email.value;

        const pm = { pm_name, pm_email }

        PmService.addPm(pm)
            .then(res => !res.ok ? res.json().then(e => Promise.reject(e)) : res.json())
            .then(newPm => {
                handlePostSuccess(newPm)
            })
            .catch(res => setError(res.error.message))
    }

    const handlePostSuccess = pm => {
        context.addPm(pm)
        document.getElementById('pm_name').value = ''
        document.getElementById('pm_email').value = ''
        setError(null)
    }

    return (
        <section className={`${styles.pmSettings}`}>
            <h2>PM Settings</h2>
            {context.pms.length === 0 ? <p className={styles.addMessage}>Add PM's here!</p> : (
                <ul className={styles.pmList}>
                    {context.pms.map(pm => <PmItem pm={pm} key={pm.id} />)}
                </ul>)}
            {error && <p>{error}</p>}
            <form onSubmit={e => handlePostPm(e)} className={styles.addPm}>
                <div className={styles.inputs}>
                    <Input type="text" id="pm_name" placeholder={"Name"}></Input>
                    <Input type="text" id="pm_email" placeholder={"Email"}></Input>
                </div>
                <ButtonDark type="submit" className={styles.addButton}>Add</ButtonDark>
                <ButtonDark type="submit" className={styles.mobileAddButton}>{plusIcon}</ButtonDark>
            </form>
        </section>
    )
}

export default PmSettings;