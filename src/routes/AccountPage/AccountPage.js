import React from 'react';
import AccountInfo from '../../components/AccountInfo/AccountInfo';
import PmSettings from '../../components/PmSettings/PmSettings';

import styles from './AccountPage.module.css'

const AccountPage = ({ onboarding, openOnboarding }) => {
    return (
        <div className="container">
            <main className="content">
                <div className={`${styles.pageContainer} ${onboarding ? styles.onboardingOpen : ""}`}>
                    <h2>Account</h2>
                    <AccountInfo openOnboarding={openOnboarding} />
                    <PmSettings />
                </div>
            </main>
        </div>
    )
}

export default AccountPage;