import React from 'react';
import './AccountPage.css'
import NavBar from '../../components/NavBar/NavBar';

export default class AccountPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Account</h1>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}