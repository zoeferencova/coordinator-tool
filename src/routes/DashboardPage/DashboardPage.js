import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';

import './DashboardPage.css'

export default class DashboardPage extends React.Component {
    
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Dashboard'} />
                    <section>
                        <h2>Requests by PM</h2>
                        <div><em>[ Placeholder for requests by PM graph ]</em></div>
                    </section>
                    <section>
                        <h2>Average Time</h2>
                        <div><em>[ Placeholder for average time graph ]</em></div>
                    </section>
                    <section>
                        <h2>Completed Requests</h2>
                        {/* <ChartWrapper /> */}
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}