import { useRef, useEffect } from 'react';
import { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } from 'd3';

const margin = { top: 0, right: 10, bottom: 40, left: 35 }
const width = 550 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

const TimespanChart = ({ data }) => {
    const d3svg = useRef(null)

    useEffect(() => {
        if (data && d3svg.current) {
            select(d3svg.current).selectAll("*").remove()

            let svg = select(d3svg.current)
                .append("svg")
                .attr("id", "main")
                .attr("viewBox", `0, 0, ${width + margin.left + margin.right}, ${height + margin.top + margin.bottom}`)
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)

            const xAxisGroup = svg.append("g")
                .attr("transform", `translate(0, ${height})`)

            const yAxisGroup = svg.append("g")

            const y = scaleLinear()
                .domain([0, max(data, d => d.count)])
                .range([height, 0])

            const x = scaleBand()
                .domain(data.map(d => d.span))
                .range([width, 0])
                .padding(0.2)

            const yAxisGrid = axisLeft(y).tickSize(-width).tickFormat("").ticks(6)
            const grid = svg.append('g')
                .classed("y-axis-grid", true)
                .call(yAxisGrid)
                .attr("color", "#EAEAEA")
                .select(".domain")
                .attr("stroke", "white")

            const xAxisCall = axisBottom(x).tickSize(0).tickPadding(12)
            xAxisGroup
                .style("font-size", "16px")
                .style("font-family", "inherit")
                .transition()
                .duration(500)
                .call(xAxisCall)
                .select(".domain")
                .attr("stroke", "#949ba2")

            const yAxisCall = axisLeft(y).tickSize(0).tickPadding(10).ticks(6)
            yAxisGroup
                .style("font-size", "16px")
                .style("color", "#949ba2")
                .style("font-family", "inherit")
                .transition()
                .duration(500)
                .call(yAxisCall)
                .select(".domain")
                .attr("stroke", "white")

            //Data Join
            const rects = svg.selectAll("rect")
                .data(data)

            //Exit
            rects
                .exit()
                .transition().duration(500)
                .attr("height", 0)
                .attr("y", height)
                .remove()

            //Update
            rects
                .transition().duration(500)
                .attr("x", d => x(d.span))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth)
                .attr("height", d => height - y(d.count))

            //Enter
            rects.enter()
                .append("rect")
                .attr("x", d => x(d.span))
                .attr("width", x.bandwidth)
                .attr("y", height)
                .attr("fill", "#BFCAD2")
                .transition().duration(500)
                .attr("y", d => y(d.count))
                .attr("height", d => height - y(d.count))
        }
    }, [data])

    return (
        <svg
            // className={styles.container}
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
            role="img"
            ref={d3svg}
        ></svg>
    )

    //Updates values based on user input dataType passed in from DashboardPage component through the ChartWrapper component
    // const update = (dataType) => {
    //     let currentData;
    //     if (dataType === 'created_days') {
    //         currentData = vis.createdDays
    //         xLabel.text('Days')
    //         yLabel.text('Number of created requests')
    //     } else if (dataType === 'created_weeks') {
    //         vis.data = vis.createdWeeks
    //         vis.xLabel.text('Weeks')
    //         vis.yLabel.text('Number of created requests')
    //     } else if (dataType === 'created_months') {
    //         vis.data = vis.createdMonths
    //         vis.xLabel.text('Months')
    //         vis.yLabel.text('Number of created requests')
    //     } else if (dataType === 'completed_days') {
    //         vis.data = vis.completedDays
    //         vis.xLabel.text('Days')
    //         vis.yLabel.text('Number of completed requests')
    //     } else if (dataType === 'completed_weeks') {
    //         vis.data = vis.completedWeeks
    //         vis.xLabel.text('Weeks')
    //         vis.yLabel.text('Number of completed requests')
    //     } else if (dataType === 'completed_months') {
    //         vis.data = vis.completedMonths
    //         vis.xLabel.text('Months')
    //         vis.yLabel.text('Number of completed requests')
    //     }

    // if (vis.data !== undefined) {


    // }
}

export default TimespanChart;
