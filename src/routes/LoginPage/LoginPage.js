import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

export default class LoginPage extends React.Component {
    render() {
        return (
            <main role="main">
                <h1>Log in</h1>
                <LoginForm />
                <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
                <p>Don't work at GP? <Link to='/main'>See the demo</Link></p>
            </main>
        )
    }
}