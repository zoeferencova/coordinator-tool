import React, { useState } from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import { ButtonLight, ButtonDark, Input, Error } from '../Utils/Utils'

import styles from '../LoginForm/LoginForm.module.css'

const RegistrationForm = ({ onRegistrationSuccess }) => {
    const [error, setError] = useState(null);

    const handleSubmit = e => {
        e.preventDefault();
        const { full_name, email, password } = e.target;

        setError(null)

        AuthApiService.postUser({
            full_name: full_name.value,
            email: email.value,
            password: password.value
        })
            .then(user => {
                full_name.value = '';
                email.value = '';
                password.value = '';
                onRegistrationSuccess();
            })
            .catch(res =>
                setError(res.error)
            )
    }

    return (
        <main>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <h2>Sign up</h2>
                {error && <Error error={error} style={{ marginRight: "25px", marginLeft: "25px" }} />}
                <div className="form-item">
                    <label className={styles.label} htmlFor="full_name">Full name</label>
                    <Input className={styles.input} required type="text" name='full_name' id='full_name' />
                </div>
                <div className="form-item">
                    <label className={styles.label} htmlFor="email">Email</label>
                    <Input className={styles.input} required type="text" name='email' id='email' />
                </div>
                <div className="form-item">
                    <label className={styles.label} htmlFor="password">Password</label>
                    <Input className={styles.input} required type="password" name='password' id='password' />
                </div>
                <div className="form-buttons">
                    <Link to='/'><ButtonLight type='button'>Cancel</ButtonLight></Link>
                    <ButtonDark type='submit'>Create Account</ButtonDark>
                </div>
            </form>
        </main>
    )
}

export default RegistrationForm;