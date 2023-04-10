import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Header from '../../components/Header/Header';
// import ChartWrapper from '../../components/ChartWrapper/ChartWrapper';
// import PieChartWrapper from '../../components/PieChartWrapper/PieChartWrapper'
import * as d3 from 'd3';
import config from '../../config'
import DashboardService from '../../services/dashboard-service'

import styles from './DashboardPage.module.css'
// import TimespanChart from '../../components/TimespanChart/TimespanChart';
// import PieChart from '../../components/PieChart/PieChart';

const DashboardPage = () => {
    const [span, setSpan] = useState('days');
    const [type, setType] = useState('created');
    const [completionTime, setCompletionTime] = useState({});
    const [pendingCount, setPendingCount] = useState('');
    const [completedPct, setCompletedPct] = useState('');

    useEffect(() => {
        d3.json(`${config.API_ENDPOINT}/data/time-completed-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => res[0].length === 0 ? setCompletionTime({ hour: "--", minute: "--" }) : DashboardService.getHourMinute(res[0].map(item => DashboardService.getMinutes(item)).reduce((acc, el) => acc + el) / res[0].length))
            .then(item => item !== undefined ? setCompletionTime(item) : item)

        d3.json(`${config.API_ENDPOINT}/data/dashboard-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => setData(res))
    }, [])

    const setData = data => {
        setPendingCount(+data[0][0].pending)

        const completed = +data[2][0].completed;

        if (completed === 0) {
            setCompletedPct(0)
        } else {
            const percentage = (completed * 100) / +data[1][0].created;
            setCompletedPct(percentage)
        }
    }

    return (
        <div className={`${styles.container} container`}>
            <main className="content">
                <Header title={'Dashboard'} />
                <div className={styles.dashboard}>
                    <div className={styles.statSection}>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <p className={styles.statName}>Current pending requests</p>
                            <p className={styles.stat}>{pendingCount}</p>
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <p className={styles.statName}>Completion rate of new requests</p>
                            <p className={styles.stat}>{completedPct}%</p>
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <p className={styles.statName}>Average request completion time</p>
                            <p className={styles.stat}>
                                {completionTime.hour}<span className={styles.time}>Hours</span>
                                {completionTime.minute}<span className={styles.time}>Minutes</span>
                            </p>
                        </section>
                    </div>
                    <div className={styles.chartSection}>
                        <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                            <h2>Requests by PM</h2>
                            {/* <PieChart /> */}
                            Pie chart
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                            <h2>{`${type} Requests`}</h2>
                            <div className={styles.radioContainer}>
                                <form className={styles.typeRadio}>
                                    <input className={styles.radioButton} type="radio" name="type" id="created" value="created" defaultChecked="checked" onChange={e => setType(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="created"> Created</label>
                                    <input className={styles.radioButton} type="radio" name="type" id="completed" value="completed" onChange={e => setType(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="completed"> Completed</label>
                                </form>
                                <form className={styles.spanRadio}>
                                    <input className={styles.radioButton} type="radio" name="span" id="days" value="days" defaultChecked="checked" onChange={e => setSpan(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="days"> Day</label>
                                    <input className={styles.radioButton} type="radio" name="span" id="weeks" value="weeks" onChange={e => setSpan(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.middle}`} htmlFor="weeks"> Week</label>
                                    <input className={styles.radioButton} type="radio" name="span" id="months" value="months" onChange={e => setSpan(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="months"> Month</label>
                                </form>

                            </div>
                            Timespan chart
                            {/* <TimespanChart /> */}
                            {/* <ChartWrapper dataType={this.state.dataType} color={"blue"} /> */}
                        </section>
                    </div>
                </div>
            </main>
            <NavBar className="nav" />
        </div>
    )
}

export default DashboardPage;