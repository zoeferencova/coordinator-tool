import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationPage.css'

export default class RegistrationPage extends React.Component {
    render() {
        return (
            <main role="main">
                <h1>Sign up</h1>
                <RegistrationForm />
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
                <p>Don't work at GP? <Link to='/main'>See the demo</Link></p>
            </main>
        )
    }
}