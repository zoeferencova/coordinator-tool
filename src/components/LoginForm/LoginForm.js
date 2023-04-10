import React, { useState } from 'react';
import AuthApiService from '../../services/auth-api-service'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '../Utils/Utils'

import styles from './LoginForm.module.css'

const LoginForm = ({ setLoggedIn }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Calls postLogin method from AuthApiService with login values from the user
    //Logs user in on success, otherwise displays error to user
    //Redirects user to MainListPage route '/main'
    const handleSubmitJwtAuth = e => {
        e.preventDefault()
        setError(null)
        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = '';
                password.value = '';
                setLoggedIn(true)
                navigate('/main')
            })
            .catch(res => {
                setError(res.error.message)
            })
    }

    return (
        <main>
            <form className='LoginForm' onSubmit={e => handleSubmitJwtAuth(e)}>
                <div role='alert'>{error && <p>{error}</p>}</div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <Input className={styles.input} required type="text" name='email' id='login-email' />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password">Password</label>
                    <Input className={styles.input} required type="password" name='password' id='login-password' />
                </div>
                <Link to='/'><Button type='button' className={`${styles.button} ${styles.cancel}`}>Cancel</Button></Link>
                <Button type='submit' className={`${styles.button} ${styles.sign}`}>Sign in</Button>
            </form>
        </main>
    )
}

export default LoginForm;