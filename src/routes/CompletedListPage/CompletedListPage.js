import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CompletedListTools from '../../components/CompletedListTools/CompletedListTools'
import CompletedListBody from '../../components/CompletedListBody/CompletedListBody'
import './CompletedListPage.css';

export default class CompletedListPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <h1>Completed</h1>
                    <CompletedListTools />
                    <br></br>
                    <CompletedListBody />
                </main>
                <NavBar />
            </div>
        )
    }
}