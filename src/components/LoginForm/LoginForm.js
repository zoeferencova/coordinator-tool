import React from 'react';
import AuthApiService from '../../services/auth-api-service'
import { Redirect } from 'react-router-dom';

export default class LoginForm extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { 
        error: null,
        toMain: false, 
    }

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
            .catch(res => {
                this.setState({ error: res.message })
            })
    }
    
    render() {
        const { error } = this.state;
        if(this.state.toMain === true ) {
            return <Redirect to='/main'></Redirect>
        }
        return (
            <main>
                <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
                <div role='alert'>{error && <p className='red'>{error}</p>}</div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input required type="text" name='email' id='login-email' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input required type="password" name='password' id='login-password' />
                    </div>
                    <button>Cancel</button>
                    <button type='submit'>Log in</button>
                </form>
            </main> 
        )
    }
}