import { useState, useEffect } from 'react'

import PieChart from './PieChart'

const prepareChartData = data => {
    return data.map(d => ({ ...d, count: +d.count }))
}

const ChartData = ({ data }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const cleanData = prepareChartData(data)
        setChartData(cleanData)
    }, [data])

    if (chartData === null) {
        return <p>Loading...</p>
    }

    return <PieChart data={chartData} />
}

export default ChartData;
