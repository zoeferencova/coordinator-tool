import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../contexts/contexts';
import { ButtonLight, ButtonDark, ProfilePicture } from '../Utils/Utils';
import TokenService from '../../services/token-service'

import styles from './AccountInfo.module.css'

const AccountInfo = ({ openOnboarding }) => {
    const context = useContext(AppContext);

    //Clears Auth Token and sets App component's state isLoggedIn to false to render the UnauthenticatedApp component
    const handleLogout = () => {
        TokenService.clearAuthToken();
        context.setLoggedIn(false)
    }

    return (
        <section className={`${styles.accountInfo} ${styles.accountContainer}`}>
            <h2>Account Info</h2>
            <div className={styles.content}>
                <div className={styles.left}>
                    {!context.loading && <ProfilePicture style={{ height: "60px", width: "60px", borderRadius: "30px", fontSize: "20px" }} full_name={context.user.full_name} />}
                    <div>
                        <p className={styles.name}>{context.user.full_name}</p>
                        <p className={styles.email}>{context.user.email}</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <ButtonLight onClick={openOnboarding}>User Guide</ButtonLight>
                    <Link to='/'><ButtonDark onClick={handleLogout}>Log Out</ButtonDark></Link>
                </div>
            </div>
        </section>
    )
}

export default AccountInfo;