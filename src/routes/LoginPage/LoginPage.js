import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm'
import Button from '../../components/Utils/Utils'

import styles from './LoginPage.module.css'

export default class LoginPage extends React.Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }
    
    
    render() {
        return (
            <main role="main">
                <h1>Log in</h1>
                <LoginForm setLoggedIn={this.props.setLoggedIn}  />
                <p>Don't have an account? <Button><Link to='/register'>Sign up</Link></Button></p>
                <p>Don't work at GP? <Button><Link to='/main'>See the demo</Link></Button></p>
            </main>
        )
    }
}