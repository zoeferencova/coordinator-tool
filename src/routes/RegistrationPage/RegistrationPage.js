import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import styles from '../LoginPage/LoginPage.module.css'

const RegistrationPage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <RegistrationForm onRegistrationSuccess={() => navigate('/login')} />
                <p className={styles.sub}>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
        </div>
    )
}

export default RegistrationPage;