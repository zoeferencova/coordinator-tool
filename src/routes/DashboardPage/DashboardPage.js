import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import config from '../../config';
import * as d3 from 'd3';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';

import './DashboardPage.css'

export default class DashboardPage extends React.Component {
    state = {
        pm_data: [],
        completed_timespan_data: [],
        created_timespan_data: [],
        // time_completed_data: []
    } 
    
    componentDidMount() {
        d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => this.setState({ pm_data: res }))

        d3.json(`${config.API_ENDPOINT}/data/completed-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => this.fixTimeSpanData(res, 'completed'))

        d3.json(`${config.API_ENDPOINT}/data/created-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => this.fixTimeSpanData(res, 'created'))

        // d3.json(`${config.API_ENDPOINT}/data/time-completed-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
        //     .then(res => this.fixCompletedData(res))       
    }

    fixTimeSpanData = (data, type) => {
        const fixed = data.map(d => d[0])
        const keys = fixed.map(d => Object.keys(d))
        fixed.map((d, i) => {
            const key = keys[i][0]
            d.count = d[key]
            delete d[key]
        })
        fixed.map((d, i) => d.type = keys[i][0]) 
        const days = []
        const weeks = []
        const months = []
        fixed.forEach(d => {
            if (d.type.includes("days")) {
                days.push(d)
            } else if (d.type.includes("weeks")) {
                weeks.push(d)
            } else if (d.type.includes("months")) {
                months.push(d)
            }
        })
        const obj = {}
        obj.days = days;
        obj.weeks = weeks;
        obj.months = months;
        type === 'completed' ? this.setState({ completed_timespan_data: obj }) : this.setState({ created_timespan_data: obj})
    }
    
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
                        {/* <ChartWrapper data={this.created_timespan_data} /> */}
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}