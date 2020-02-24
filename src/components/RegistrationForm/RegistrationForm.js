import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';

import styles from './RegistrationForm.module.css'

export default class RegistrationForm extends React.Component {
    static defaultProps = {
        onRegistrationSuccess: () => {}
    }

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
                    <div>
                        <label htmlFor="full_name">Full name</label>
                        <input required type="text" name='full_name' id='full_name' placeholder='Full Name' />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input required type="text" name='email' id='email' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input required type="password" name='password' id='password' />
                    </div>
                    <Link to='/'><button>Cancel</button></Link>
                    <button type='submit'>Create Account</button>
                </form>
            </main> 
        )
    }
}