import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import './ArchivePage.css'

export default class ArchivePage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Archive</h1>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}