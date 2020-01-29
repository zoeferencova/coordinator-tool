import React from 'react';
import './MainListPage.css'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import NavBar from '../../components/NavBar/NavBar'

export default class MainListPage extends React.Component {
    
    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        return (
            <div className="container">
                <main className="content">
                    <h1>{new Date().toLocaleDateString("en-US", dateOptions)}</h1>
                    <MainListTools />
                    <br></br>
                    <MainListBody />
                </main>
                <NavBar />
            </div>
            
        )
    }
}