import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './RegistrationPage.css'

export default class RegistrationPage extends React.Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props;
        history.push('/login')
    }
    
    render() {
        return (
            <main role="main">
                <h1>Sign up</h1>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
                <p>Already have an account? <Link to='/login'>Log in</Link></p>
                <p>Don't work at GP? <Link to='/main'>See the demo</Link></p>
            </main>
        )
    }
}