import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import { Button, Input } from '../Utils/Utils'

import styles from '../LoginForm/LoginForm.module.css'

export default class RegistrationForm extends React.Component {
    state = { error: null };

    handleSubmit = e => {
        e.preventDefault();
        const { full_name, email, password } = e.target;

        this.setState({ error: null })

        AuthApiService.postUser({
            full_name: full_name.value,
            email: email.value,
            password: password.value
        })
            .then(user => {
                full_name.value = '';
                email.value = '';
                password.value = '';
                this.props.onRegistrationSuccess();
            })
            .catch(res => 
                this.setState({ error: res.error })
            )
    }
    
    render() {
        const { error } = this.state;
        return (
            <main>
                <form onSubmit={this.handleSubmit}>
                    <div role="alert">
                        {error && <p>{error}</p>}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="full_name">Full name</label>
                        <Input className={styles.input} required type="text" name='full_name' id='full_name' />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="email">Email</label>
                        <Input className={styles.input} required type="text" name='email' id='email' />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <Input  className={styles.input}required type="password" name='password' id='password' />
                    </div>
                    <Link to='/'><Button type='button' className={`${styles.button} ${styles.cancel}`}>Cancel</Button></Link>
                    <Button type='submit' className={`${styles.button} ${styles.sign}`}>Create Account</Button>
                </form>
            </main> 
        )
    }
}