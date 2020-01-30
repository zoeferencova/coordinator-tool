import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header'

import './DashboardPage.css'

export default class DashboardPage extends React.Component {
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Dashboard'} />
                    <section>
                        <h2>Total requests</h2>
                        <div><em>[ Placeholder for total request graph ]</em></div>
                    </section>
                    <section>
                        <h2>Average Time</h2>
                        <div><em>[ Placeholder for average time graph ]</em></div>
                    </section>
                    <section>
                        <h2>Completed Requests</h2>
                        <div><em>[ Placeholder for completed request graph ]</em></div>
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}