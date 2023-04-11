import React, { useState } from 'react';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import PmSettings from '../../components/PmSettings/PmSettings';
import { UserGuide } from '../../components/Utils/Utils'

import styles from './AccountPage.module.css'
import modalStyles from '../../components/SendEmailForm/SendEmailForm.module.css'

const AccountPage = () => {
    const [userGuide, setUserGuide] = useState(false);

    return (
        <div className="container">
            <main className="content">
                <div className={styles.pageContainer}>
                    <h2>Account</h2>
                    <AccountInfo setUserGuide={setUserGuide} />
                    <PmSettings />
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
        </div>
    )
}

export default AccountPage;