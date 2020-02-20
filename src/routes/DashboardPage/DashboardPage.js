import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';
import PieChartWrapper from '../../components/PieChartWrapper/PieChartWrapper'

import './DashboardPage.css'

export default class DashboardPage extends React.Component {
    state = {
        dataType: 'created_days',
        span: 'days',
        type: 'created',
    } 
    
    // componentDidMount() {
    //     d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
    //         .then(res => this.setState({ pm_data: res }))

    //     d3.json(`${config.API_ENDPOINT}/data/completed-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
    //         .then(res => this.fixTimeSpanData(res, 'completed'))

    //     d3.json(`${config.API_ENDPOINT}/data/created-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
    //         .then(res => this.fixTimeSpanData(res, 'created'))

    //     // d3.json(`${config.API_ENDPOINT}/data/time-completed-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
    //     //     .then(res => this.fixCompletedData(res))       
    // }

    changeType = (type) => {
        const dataType = `${type}_${this.state.span}`
        this.setState({ dataType, type })
    }

    changeSpan = (span) => {
        const dataType = `${this.state.type}_${span}`
        this.setState({ dataType, span })
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Dashboard'} />
                    <section>
                        <h2>Requests by PM</h2>
                        <div><em>[ Placeholder for requests by PM graph ]</em></div>
                        <PieChartWrapper />
                    </section>
                    <section>
                        <h2>Average Time</h2>
                        <div><em>[ Placeholder for average time graph ]</em></div>
                    </section>
                    <section>
                        <h2>Completed Requests</h2>
                        <form>
                            <input type="radio" name="span" id="days" value="days" defaultChecked="checked" onChange={e => this.changeSpan(e.target.value)}></input>
                            <label htmlFor="days"> Day</label><br></br>
                            <input type="radio" name="span" id="weeks" value="weeks" onChange={e => this.changeSpan(e.target.value)}></input>
                            <label htmlFor="weeks"> Week</label><br></br>
                            <input type="radio" name="span" id="months" value="months" onChange={e => this.changeSpan(e.target.value)}></input>
                            <label htmlFor="months"> Month</label><br></br><br></br>
                        </form>
                        <form>
                            <input type="radio" name="type" id="created" value="created" defaultChecked="checked" onChange={e => this.changeType(e.target.value)}></input>
                            <label htmlFor="created"> Created</label><br></br>
                            <input type="radio" name="type" id="completed" value="completed" onChange={e => this.changeType(e.target.value)}></input>
                            <label htmlFor="completed"> Completed</label>
                        </form>
                        <ChartWrapper dataType={this.state.dataType} />
                    </section>
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}