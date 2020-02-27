import React, { Component } from 'react';
import PieChart from '../PieChart/PieChart';

import styles from './PieChartWrapper.module.css'

export default class PieChartWrapper extends Component {
    componentDidMount() {
        this.setState({ chart: new PieChart(this.refs.chart, this.refs.info) })
    }

    render() {
        return (
            <div className={styles.chartContainer}>
                <div ref="chart"></div>
                <div ref="info" className={styles.info}></div>
            </div>
        );
    }
}
