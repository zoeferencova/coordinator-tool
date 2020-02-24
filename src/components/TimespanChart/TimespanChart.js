import * as d3 from 'd3';
import config from '../../config'

const MARGIN = { TOP: 10, RIGHT: 10, BOTTOM: 70, LEFT: 70 }
const WIDTH = 550 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 350 - MARGIN.TOP - MARGIN.BOTTOM;

export default class TimespanChart {
    fixTimeSpanData = (data) => {
        const fixed = data.map(d => d[0])
        const keys = fixed.map(d => Object.keys(d))
        fixed.map((d, i) => {
            const key = keys[i][0]
            d.count = d[key]
            delete d[key]
        })
        fixed.map((d, i) => d.span = keys[i][0]) 
        const days = []
        const weeks = []
        const months = []
        fixed.forEach(d => {
            if (d.span.includes("days")) {
                d.span = d.span.slice(5)
                days.push(d)
            } else if (d.span.includes("weeks")) {
                d.span = d.span.slice(6)
                weeks.push(d)
            } else if (d.span.includes("months")) {
                d.span = d.span.slice(7)
                months.push(d)
            }
        })
        days[1].span = 'Yesterday'
        const obj = {}
        obj.days = days;
        obj.weeks = weeks;
        obj.months = months;
        return obj;
    }

    constructor(element) {
        const vis = this;
        vis.svg = d3.select(element)
            .append("svg")
                .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
                .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")
                .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
            
        vis.yLabel = vis.svg.append("text")
            .attr("x", -HEIGHT/2)
            .attr("y", -50)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")

        vis.xLabel = vis.svg.append("text")
            .attr("x", WIDTH/2)
            .attr("y", HEIGHT + 50)
            .attr("text-anchor", "middle")

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", `translate(0, ${HEIGHT})`)

        vis.yAxisGroup = vis.svg.append("g")

        Promise.all([
            d3.json(`${config.API_ENDPOINT}/data/completed-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
                .then(res => this.fixTimeSpanData(res, 'completed')),

            d3.json(`${config.API_ENDPOINT}/data/created-timespan-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
                .then(res => this.fixTimeSpanData(res, 'created'))
        ]).then(datasets => {
            vis.completedDays = datasets[0].days;
            vis.completedWeeks = datasets[0].weeks;
            vis.completedMonths = datasets[0].months;
            vis.createdDays = datasets[1].days;
            vis.createdWeeks = datasets[1].weeks;
            vis.createdMonths = datasets[1].months;
            vis.update("created_days")
        })
        
    }

    update(dataType) {
        const vis = this;
        if (dataType === 'created_days') {
            vis.data = vis.createdDays
            vis.xLabel.text('Days')
            vis.yLabel.text('Number of created requests')
        } else if (dataType === 'created_weeks') {
            vis.data = vis.createdWeeks
            vis.xLabel.text('Weeks')
            vis.yLabel.text('Number of created requests')
        } else if (dataType === 'created_months') {
            vis.data = vis.createdMonths
            vis.xLabel.text('Months')
            vis.yLabel.text('Number of created requests')
        } else if (dataType === 'completed_days') {
            vis.data = vis.completedDays
            vis.xLabel.text('Days')
            vis.yLabel.text('Number of completed requests')
        } else if (dataType === 'completed_weeks') {
            vis.data = vis.completedWeeks
            vis.xLabel.text('Weeks')
            vis.yLabel.text('Number of completed requests')
        } else if (dataType === 'completed_months') {
            vis.data = vis.completedMonths
            vis.xLabel.text('Months')
            vis.yLabel.text('Number of completed requests')
        } 
        
        if (vis.data !== undefined) {
            const y = d3.scaleLinear()
                .domain([0, d3.max(vis.data, d => Number(d.count))])
                .range([HEIGHT, 0])

            const x = d3.scaleBand()
                .domain(vis.data.map(d => d.span))
                .range([WIDTH, 0])
                .padding(0.4)

            const xAxisCall = d3.axisBottom(x)
            vis.xAxisGroup
                .transition()
                .duration(500)
                .call(xAxisCall)
            
            const yAxisCall = d3.axisLeft(y)
            vis.yAxisGroup
                .transition()
                .duration(500)
                .call(yAxisCall)

            //DATA JOIN
            const rects = vis.svg.selectAll("rect")
                .data(vis.data)

            //EXIT
            rects
                .exit()
                .transition().duration(500)
                    .attr("height", 0)
                    .attr("y", HEIGHT)
                    .remove()

            //UPDATE
            rects
                .transition().duration(500)
                .attr("x", d => x(d.span))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth)
                .attr("height", d => HEIGHT - y(d.count))

            //ENTER
            rects.enter()
                .append("rect")
                    .attr("x", d => x(d.span))
                    .attr("width", x.bandwidth)
                    .attr("y", HEIGHT)
                    .transition().duration(500)
                        .attr("y", d => y(d.count))
                        .attr("height", d => HEIGHT - y(d.count))

        } 
    }
}
