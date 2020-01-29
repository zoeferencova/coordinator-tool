import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './EmailPage.css'

export default class EmailPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Email Templates</h1>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}