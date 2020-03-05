import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'
import { Button } from '../../components/Utils/Utils'

import styles from './LoginPage.module.css'

export default class LoginPage extends React.Component {

    render() {
        return (
            <div className={styles.main}>
                <h1 className={styles.title}>Sign in</h1>
                <div className={styles.container}>
                    <LoginForm setLoggedIn={this.props.setLoggedIn}  />
                    <p className={styles.sub}>Don't have an account? <Link to='/register'>Sign up</Link></p>
                </div>
            </div>
        )
    }
}