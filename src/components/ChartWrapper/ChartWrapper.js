import React, { Component } from 'react';
import TimespanChart from '../TimespanChart/TimespanChart';

export default class ChartWrapper extends Component {
    componentDidMount() {
        this.setState({ chart: new TimespanChart(this.refs.chart) })
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.dataType)
    }

    render() {
        return (
            <div ref="chart"></div>
        );
    }
}
