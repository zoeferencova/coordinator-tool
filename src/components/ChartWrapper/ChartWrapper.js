import React, { useEffect, useRef } from 'react';
import TimespanChart from '../TimespanChart/TimespanChart';

// const ChartWrapper = () => {
//     //Creates a new instance of the TimespanChart class and attaching to the ChartWrapper div using a ref
//     componentDidMount() {
//         this.setState({ chart: new TimespanChart(this.refs.chart) })
//     }

//     //Makes sure that the updates are done manually through componentWillReceiveProps method below
//     shouldComponentUpdate() {
//         return false;
//     }

//     //Passes props to the chart's update method on user interaction from the parent DashboardPage component
//     componentWillReceiveProps(nextProps) {
//         this.state.chart.update(nextProps.dataType, nextProps.color)
//     }

//     return <div ref="chart"></div>
// }
