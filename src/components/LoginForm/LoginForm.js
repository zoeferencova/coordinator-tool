import React from 'react';
import AuthApiService from '../../services/auth-api-service'

export default class LoginForm extends React.Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    }

    state = { error: null }

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
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }
    
    render() {
        const { error } = this.state;

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