import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';
import PieChartWrapper from '../../components/PieChartWrapper/PieChartWrapper'
import * as d3 from 'd3';
import config from '../../config'
import DashboardService from '../../services/dashboard-service'

import styles from './DashboardPage.module.css'

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
            .then(res => res[0].length === 0 ? this.setState({ completionTime: { hour: "--", minute: "--"} }) : DashboardService.getHourMinute(res[0].map(item => DashboardService.getMinutes(item)).reduce((acc, el) => acc + el)/res[0].length))
            .then(item => item !== undefined ? this.setState({ completionTime: item }) : item)

        d3.json(`${config.API_ENDPOINT}/data/dashboard-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => this.setDashData(res))
    }

    setDashData(data) {
        this.setState({ pending: Number(data[0][0].pending) })
        if (Number(data[2][0].completed) === 0) {
            this.setState({ completion: 0 })
        } else {
            const percentage = (Number(data[2][0].completed) * 100)/Number(data[1][0].created);
            this.setState({ completion: parseInt(percentage) })
        }
    }

    //Changes values that are passed into the TimespanChart
    //Values can either be 'completed' or 'created' based on input
    changeType = (type) => {
        const dataType = `${type}_${this.state.span}`
        this.setState({ dataType, type })
    }

    //Changes values that are passed into the TimespanChart
    //Values can either be 'days', 'weeks' or 'months' based on input
    changeSpan = (span) => {
        const dataType = `${this.state.type}_${span}`
        this.setState({ dataType, span })
    }
    
    render() {
        return (
            <div className="container">
                <main className="content">
                    <Header title={'Dashboard'} />
                    <div className={styles.dashboard}>
                        <div className={styles.statSection}>
                            <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                                <p className={styles.statName}>Current pending requests</p>
                                <p className={styles.stat}>{this.state.pending}</p>
                            </section>
                            <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                                <p className={styles.statName}>Completion rate of new requests</p>
                                <p className={styles.stat}>{this.state.completion}%</p>
                            </section>
                            <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                                <p className={styles.statName}>Average request completion time</p> 
                                <p className={styles.stat}>{this.state.completionTime.hour}<span className={styles.time}>Hours</span> {this.state.completionTime.minute}<span className={styles.time}>Minutes</span></p>
                            </section>
                        </div>
                        <div className={styles.chartSection}>
                            <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                                <h2>Requests by PM</h2>
                                <PieChartWrapper />
                            </section>
                            <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                                <h2>{`${(this.state.type).charAt(0).toUpperCase() + this.state.type.slice(1)} Requests`}</h2>
                                <div className={styles.radioContainer}>
                                    <form className={styles.typeRadio}>
                                        <input className={styles.radioButton} type="radio" name="type" id="created" value="created" defaultChecked="checked" onChange={e => this.changeType(e.target.value)}></input>
                                        <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="created"> Created</label>
                                        <input className={styles.radioButton} type="radio" name="type" id="completed" value="completed" onChange={e => this.changeType(e.target.value)}></input>
                                        <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="completed"> Completed</label>
                                    </form>
                                    <form className={styles.spanRadio}>
                                        <input className={styles.radioButton} type="radio" name="span" id="days" value="days" defaultChecked="checked" onChange={e => this.changeSpan(e.target.value)}></input>
                                        <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="days"> Day</label>
                                        <input className={styles.radioButton} type="radio" name="span" id="weeks" value="weeks" onChange={e => this.changeSpan(e.target.value)}></input>
                                        <label className={`${styles.radioLabel} ${styles.middle}`} htmlFor="weeks"> Week</label>
                                        <input className={styles.radioButton} type="radio" name="span" id="months" value="months" onChange={e => this.changeSpan(e.target.value)}></input>
                                        <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="months"> Month</label>
                                    </form>
                                    
                                </div>
                                
                                <ChartWrapper dataType={this.state.dataType} color={"blue"} />
                            </section>
                        </div>           
                    </div>         
                </main>
                <NavBar className="nav" />
            </div>
        )
    }
}