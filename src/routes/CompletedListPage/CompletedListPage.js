import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CompletedListTools from '../../components/CompletedListTools/CompletedListTools'
import CompletedListBody from '../../components/CompletedListBody/CompletedListBody'
import Header from '../../components/Header/Header'
import './CompletedListPage.css';

export default class CompletedListPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={"Completed"} />
                    <CompletedListTools />
                    <br></br>
                    <CompletedListBody />
                </main>
                <NavBar />
            </div>
        )
    }
}