import React, { useState, useEffect, useContext, useRef } from 'react';
import DashboardService from '../../services/dashboard-service'

import styles from './DashboardPage.module.css'
import { listIconLight, checkSquareLight, clockIcon, userIcon, plusCircleIcon, checkIconLight } from '../../components/Utils/Utils';
import TimespanChartData from '../../components/TimespanChart/TimespanChartData';
import PieChartData from '../../components/PieChart/PieChartData';
import AppContext from '../../contexts/contexts';

const DashboardPage = () => {
    const context = useContext(AppContext)

    const [span, setSpan] = useState('days');
    const [type, setType] = useState('created');
    const [completionTime, setCompletionTime] = useState(null);
    const [pendingCount, setPendingCount] = useState(null);
    const [completedPct, setCompletedPct] = useState(null);
    const [timespanChartData, setTimespanChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);

    useEffect(() => {
        if (context.dashboardData.length) {
            setTimespanChartData(context.dashboardData[0])
            setPieChartData(context.dashboardData[1])

            const completionTime = context.dashboardData[2]
            if (completionTime[0].length === 0) {
                setCompletionTime({ hour: "— ", minute: "— " })
            } else {
                const formattedTime = DashboardService.getHourMinute(completionTime[0].map(item => DashboardService.getMinutes(item)).reduce((acc, el) => acc + el) / completionTime[0].length)
                setCompletionTime(formattedTime)
            }

            setPendingCount(+context.dashboardData[3][0][0].pending)

            const completed = +context.dashboardData[3][2][0].completed;

            if (completed === 0) {
                setCompletedPct("0")
            } else {
                const percentage = (completed * 100) / +context.dashboardData[3][1][0].created;
                setCompletedPct(Math.round(percentage))
            }
        }
    }, [context.dashboardData])

    const handleSpanChange = val => {
        setSpan(val)
        updateTimespanChart(type, val)
    }

    const handleTypeChange = val => {
        setType(val)
        updateTimespanChart(val, span)
    }

    const updateTimespanChart = (type, span) => {
        DashboardService.getTimespanData(type, span)
            .then(res => setTimespanChartData(res))
    }

    return (
        <div className={`${styles.container} container`}>
            <main className="content">
                <div className={styles.dashboard}>
                    <div className={styles.statSection}>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <h3>{listIconLight}Pending requests</h3>
                            {pendingCount && <p className={styles.stat}>{pendingCount}</p>}
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <h3>{checkIconLight}Completion rate today</h3>
                            {completedPct && <p className={styles.stat}>{completedPct}%</p>}
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.statContainer}`}>
                            <h3>{clockIcon}Average completion time</h3>
                            <p className={styles.stat}>
                                {completionTime && `${completionTime.hour}h ${completionTime.minute}m`}
                            </p>
                        </section>
                    </div>
                    <div className={styles.chartSection}>
                        <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                            <h3>{userIcon}Requests by PM</h3>
                            <div className={styles.pieChartContainer}>
                                {pieChartData && <PieChartData data={pieChartData} />}
                            </div>
                        </section>
                        <section className={`${styles.dashboardContainer} ${styles.chartContainer}`}>
                            <h3><span className={styles.capitalize}>{type === "created" ? plusCircleIcon : checkSquareLight}{type}</span> requests</h3>
                            <div className={styles.radioContainer}>
                                <form className={styles.typeRadio}>
                                    <input className={styles.radioButton} type="radio" name="type" id="created" value="created" defaultChecked="checked" onChange={e => handleTypeChange(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="created"> Created</label>
                                    <input className={styles.radioButton} type="radio" name="type" id="completed" value="completed" onChange={e => handleTypeChange(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="completed"> Completed</label>
                                </form>
                                <form className={styles.spanRadio}>
                                    <input className={styles.radioButton} type="radio" name="span" id="days" value="days" defaultChecked="checked" onChange={e => handleSpanChange(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.first}`} htmlFor="days"> Day</label>
                                    <input className={styles.radioButton} type="radio" name="span" id="weeks" value="weeks" onChange={e => handleSpanChange(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.middle}`} htmlFor="weeks"> Week</label>
                                    <input className={styles.radioButton} type="radio" name="span" id="months" value="months" onChange={e => handleSpanChange(e.target.value)}></input>
                                    <label className={`${styles.radioLabel} ${styles.last}`} htmlFor="months"> Month</label>
                                </form>

                            </div>
                            <div className={styles.timespanChartContainer}>
                                {timespanChartData && <TimespanChartData data={timespanChartData} />}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage;