import React, { useState } from 'react';
import AuthApiService from '../../services/auth-api-service'
import { Link, useNavigate } from 'react-router-dom';
import { ButtonDark, ButtonLight, Input, Error } from '../Utils/Utils'

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
                setError(res.error)
            })
    }

    return (
        <main>
            <form className='form' onSubmit={e => handleSubmitJwtAuth(e)}>
                <h2>Log in</h2>
                {error && <Error style={{ marginRight: "25px", marginLeft: "25px" }} error={error} />}
                <div className="form-item">
                    <label className={styles.label} htmlFor="email">Email</label>
                    <Input className={styles.input} required type="text" name='email' id='login-email' />
                </div>
                <div className="form-item">
                    <label className={styles.label} htmlFor="password">Password</label>
                    <Input className={styles.input} required type="password" name='password' id='login-password' />
                </div>
                <div className="form-buttons">
                    <Link to='/'><ButtonLight type='button'>Cancel</ButtonLight></Link>
                    <ButtonDark type='submit'>Sign in</ButtonDark>
                </div>
            </form>
        </main>
    )
}

export default LoginForm;