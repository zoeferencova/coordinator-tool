import React from 'react';
import AuthApiService from '../../services/auth-api-service';

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
            .catch(res => {
                this.setState({ error: res.error })
            })
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
                        <label htmlFor="first-name">First name</label>
                        <input required placeholder='First Name' type="text" name='first-name' id='first-name' />
                    </div>
                    <div>
                        <label htmlFor="last-name">Last name</label>
                        <input required type="text" name='last-name' id='last-name' placeholder='Last Name' />
                    </div>
                    <div>
                        <label htmlFor="username">Email</label>
                        <input required type="text" name='username' id='username' />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input required type="password" name='password' id='password' />
                    </div>
                    <button>Cancel</button>
                    <button type='submit'>Create Account</button>
                </form>
            </main> 
        )
    }
}