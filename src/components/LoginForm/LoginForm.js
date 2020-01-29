import React from 'react';

export default class LoginForm extends React.Component {
    render() {
        return (
            <main>
                <form>
                    <div>
                        <label for="username">Email</label>
                        <input type="text" name='username' id='username' />
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" name='password' id='password' />
                    </div>
                    <button>Cancel</button>
                    <button type='submit'>Log in</button>
                </form>
            </main> 
        )
    }
}