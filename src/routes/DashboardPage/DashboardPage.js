import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
// import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';

import './DashboardPage.css'

export default class DashboardPage extends React.Component {
     // fetchDashboardData() {
        //   fetch(`${config.API_ENDPOINT}/data/pm-data`, {
        //     method: 'GET',
        //     headers: {
        //         'content-type': 'application/json',
        //         'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
        //     }
        //     })
        //         .then(res => 
        //           (!res.ok)
        //             ? res.json().then(e => Promise.reject(e))
        //             : res.json()
        //         )
        //         .then(resJson => this.setPmData(resJson))

        //   fetch(`${config.API_ENDPOINT}/data/timespan-data`, {
        //     method: 'GET',
        //     headers: {
        //         'content-type': 'application/json',
        //         'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
        //     }
        //     })
        //         .then(res => 
        //           (!res.ok)
        //             ? res.json().then(e => Promise.reject(e))
        //             : res.json()
        //         )
        //         .then(resJson => this.setTimespanData(resJson))

        //   fetch(`${config.API_ENDPOINT}/data/time-completed-data`, {
        //     method: 'GET',
        //     headers: {
        //         'content-type': 'application/json',
        //         'Authorization': `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}`
        //     }
        //     })
        //         .then(res => 
        //           (!res.ok)
        //             ? res.json().then(e => Promise.reject(e))
        //             : res.json()
        //         )
        //         .then(resJson => this.setTimeCompletedData(resJson))
        // }

        // setPmData = userData => {
        //   this.setState({ data: {...this.state.data, pm_data: userData } })
        // }

        // setTimespanData = userData => {
        //   this.setState({ data: {...this.state.data ,timespan_data: userData } })
        // }

        // setTimeCompletedData = userData => {
        //   this.setState({ data: {...this.state.data, time_completed_data: userData } })
        // }
    
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