import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import styles from '../LoginPage/LoginPage.module.css'

export default class RegistrationPage extends React.Component {
    
    //Redirects user to login form after successful registration
    handleRegistrationSuccess = user => {
        const { history } = this.props;
        history.push('/login')
    }
    
    render() {
        return (
            <div className={styles.main}>
                <h1 className={styles.title}>Sign up</h1>
                <div className={styles.container}>
                    <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess}  />
                    <p className={styles.sub}>Already have an account? <Link to='/login'>Sign in</Link></p>
                </div>
            </div>
        )
    }
}