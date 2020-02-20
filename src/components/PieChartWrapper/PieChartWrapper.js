import React, { Component } from 'react';
import PieChart from '../PieChart/PieChart';

export default class PieChartWrapper extends Component {
    componentDidMount() {
        this.setState({ chart: new PieChart(this.refs.chart) })
    }

    render() {
        return (
            <div ref="chart"></div>
        );
    }
}
