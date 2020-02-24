import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend'
import config from '../../config'

import styles from './PieChart.module.css'

const MARGIN = 40;
const WIDTH = 600;
const HEIGHT = 450;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;

export default class PieChart {

    constructor(element) {

        const vis = this;
        vis.svg = d3.select(element)
            .append("svg")
                .attr("width", WIDTH)
                .attr("height", HEIGHT)
            .append("g")
                .attr("transform", `translate(${WIDTH/2}, ${HEIGHT/2})`)
        
        const colors = ['#c95757', '#79a3ba', '#69a867', '#faf1a2', '#9679b3', "#ebbb91", "#4d557d", "#f5b3cd", "#752221", "#367041", "#ccdae8", "#a8f7ef", "#e2f5c1"]

        d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => {
                console.log(res)
                res.map((d, i) => d.color = colors[i])
                vis.data = res;
                vis.color = d3.scaleOrdinal()
                    .domain(vis.data.map(d => d.pm_name))
                    .range(vis.data.map(d => d.color))

                vis.pie = d3.pie()
                    .value(d => d.value.count)

                vis.data_ready = vis.pie(d3.entries(vis.data))

                vis.svg
                    .selectAll('whatever')
                    .data(vis.data_ready)
                    .enter()
                    .append('path')
                    .attr('d', d3.arc()
                        .innerRadius(100)         // This is the size of the donut hole
                        .outerRadius(RADIUS)
                    )
                    .attr('fill', function(d){ return(vis.color(d.data.key)) })
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                vis.svg.append("g")
                    .attr("class", "legendOrdinal")
                    .attr("transform", "translate(230, -100)")

                const legendOrdinal = legendColor()
                    .labelFormat(d3.format(".2f"))
                    .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
                    .shapePadding(10)
                    .cellFilter(d => isNaN(Number(d.label)))
                    .title("Legend")
                    .scale(vis.color)

                vis.svg.select(".legendOrdinal")
                    .call(legendOrdinal)

            })

        console.log(colors)

        
    }
}
