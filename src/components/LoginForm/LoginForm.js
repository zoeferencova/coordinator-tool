import React from 'react';
import AppContext from '../../contexts/contexts'
import AuthApiService from '../../services/auth-api-service'
import { Redirect, Link } from 'react-router-dom';
import { Button, Input } from '../Utils/Utils'

import styles from './LoginForm.module.css'

export default class LoginForm extends React.Component {
    static contextType = AppContext;

    state = { 
        error: null,
        toMain: false, 
    }

    //Calls postLogin method from AuthApiService with login values from the user
    //Logs user in on success, otherwise displays error to user
    //Redirects user to MainListPage route '/main'
    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({ error: null })
        const { email, password } = e.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
                email.value = '';
                password.value = '';
                this.setState({ toMain: true })
            })
            .then(res => this.props.setLoggedIn(true))
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    render() {
        const { error } = this.state;
        if(this.state.toMain === true ) {
            return <Redirect to='/main'></Redirect>
        }

        return (
            <main>
                <form className='LoginForm' onSubmit={e => this.handleSubmitJwtAuth(e)}>
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
}