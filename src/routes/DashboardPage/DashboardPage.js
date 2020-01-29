import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './DashboardPage.css'

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Dashboard</h1>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}