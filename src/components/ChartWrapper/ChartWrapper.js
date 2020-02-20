import React, { Component } from 'react';
import TimespanChart from '../TimespanChart/TimespanChart';

export default class ChartWrapper extends Component {
    componentDidMount() {
        this.setState({ chart: new TimespanChart(this.refs.chart, this.props.data) })
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.state.chart.update(nextProps.data)
    }

    render() {
        return (
            <div ref="chart"></div>
        );
    }
}
