import React from 'react';
import './MainListPage.css'
import MainListTools from '../../components/MainListTools/MainListTools';
import MainListBody from '../../components/MainListBody/MainListBody';
import MobileListBody from '../../components/MobileListBody/MobileListBody';
import NavBar from '../../components/NavBar/NavBar'
import Header from '../../components/Header/Header';

export default class MainListPage extends React.Component {
    
    render() {
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }
        const title = new Date().toLocaleDateString("en-US", dateOptions)
        return (
            <div className="container">
                <main className="content">
                    <Header title={title} />
                    <MainListTools />
                    <br></br>
                    <div className='mobile-list-container'>
                        <MobileListBody />
                    </div>
                    <div className='main-list-container'>
                        <MainListBody />
                    </div>
                    
                </main>
                <NavBar />
            </div>
            
        )
    }
}