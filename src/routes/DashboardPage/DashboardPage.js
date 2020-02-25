import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';
import PieChartWrapper from '../../components/PieChartWrapper/PieChartWrapper'
import * as d3 from 'd3';
import config from '../../config'

import styles from './DashboardPage.module.css'
import { formatDefaultLocale } from 'd3';

export default class DashboardPage extends React.Component {
    state = {
        dataType: 'created_days',
        span: 'days',
        type: 'created',
        completionTime: {},
        pending: '',
        completion: '',

    } 

    componentDidMount() {
        d3.json(`${config.API_ENDPOINT}/data/time-completed-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => res[0].length === 0 ? this.setState({ completionTime: { hour: "--", minute: "--"} }) : this.getHourMinute(res[0].map(item => this.getMinutes(item)).reduce((acc, el) => acc + el)/res[0].length))
            .then(item => item !== undefined ? this.setState({ completionTime: item }) : item)

        d3.json(`${config.API_ENDPOINT}/data/dashboard-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => this.formatDashData(res))
    }

    getMinutes(item) {
        let minutes = 0;
        if (item.difference.months) {
            minutes += item.difference.months*4*7*24*60 
        }
        if (item.difference.weeks) {
            minutes += item.difference.weeks*7*24*60
        }
        if (item.difference.days) {
            minutes += item.difference.days*24*60 
        }
        if (item.difference.hours) {
            minutes += item.difference.hours*60
        }
        if (item.difference.minutes) {
            minutes += item.difference.minutes
        }
        if (item.difference.seconds) {
            minutes += 0
        }
        item = minutes

        return item
    }
    
    getHourMinute(item) {
        const minute = Number(item) % 60;
        const hour = Number(item)/60
        return { hour: parseInt(hour), minute: parseInt(minute) }
    }

    formatDashData(data) {
        this.setState({ pending: Number(data[0][0].pending) })
        if (Number(data[2][0].completed) === 0) {
            this.setState({ completion: 0 })
        } else {
            const percentage = (Number(data[2][0].completed) * 100)/Number(data[1][0].created);
            this.setState({ completion: parseInt(percentage) })
        }
    }

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
                        <p>Current pending requests: {this.state.pending}</p>
                        <p>Completion rate of new requests this week: {this.state.completion}%</p>
                        <p>Average completion time of requests completed this week: Hours: {this.state.completionTime.hour}, Minutes: {this.state.completionTime.minute}</p>
                    </section>
                    <section>
                        <h2>Requests by PM</h2>
                        <PieChartWrapper />
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