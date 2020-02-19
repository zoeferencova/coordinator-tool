import React from 'react';
import AppContext from '../../contexts/contexts'
import AuthApiService from '../../services/auth-api-service'
import { Redirect, Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
    static contextType = AppContext;
    
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
                <form className='LoginForm' onSubmit={this.handleSubmitJwtAuth}>
                <div role='alert'>{error && <p>{error}</p>}</div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input required type="text" name='email' id='login-email' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input required type="password" name='password' id='login-password' />
                    </div>
                    <Link to='/'><button>Cancel</button></Link>
                    <button type='submit'>Log in</button>
                </form>
            </main> 
        )
    }
}