import { useState, useEffect } from 'react'

import TimespanChart from './TimespanChart'

const prepareChartData = data => {
    const fixedKeys = data.map(d => d = d[0])
    const arr = []
    fixedKeys.forEach(d => {
        for (let i in d) {
            arr.push({ span: i, count: +d[i] })
        }
    })
    return arr;
}

const TimespanChartData = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const cleanData = prepareChartData(data)
        setChartData(cleanData)
    }, [data])

    if (chartData === null) {
        return <p>Loading...</p>
    }

    return <TimespanChart data={chartData} selectedType="completed" selectedSpan="days" />
}

export default TimespanChartData;
