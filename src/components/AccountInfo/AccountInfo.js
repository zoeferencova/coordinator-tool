import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import { Button, userIcon } from '../Utils/Utils';
import TokenService from '../../services/token-service'

import styles from './AccountInfo.module.css'

const AccountInfo = ({ setUserGuide }) => {
    const context = useContext(AppContext);

    //Clears Auth Token and sets App component's state isLoggedIn to false to render the UnauthenticatedApp component
    const handleLogout = () => {
        TokenService.clearAuthToken();
        context.setLoggedIn(false)
    }

    return (
        <section className={`${styles.accountInfo} ${styles.accountContainer}`}>
            <h2>Account Info</h2>
            {userIcon}
            <p className={styles.name}>{context.user.full_name}</p>
            <p className={styles.email}>{context.user.email}</p>
            <Button onClick={() => setUserGuide(true)}>User Guide</Button>
            <Link to='/'><Button onClick={handleLogout}>Log Out</Button></Link>
        </section>
    )
}

export default AccountInfo;