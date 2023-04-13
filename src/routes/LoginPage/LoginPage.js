import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'

import styles from './LoginPage.module.css'

const LoginPage = ({ setLoggedIn }) => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <LoginForm setLoggedIn={setLoggedIn} />
                <p className={styles.sub}>Don't have an account? <Link to='/register'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default LoginPage;