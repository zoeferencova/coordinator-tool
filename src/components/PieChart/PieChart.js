import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend'

import config from '../../config'

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
        
        const colors = ['#97c9d1', '#faf0b1', '#8176b5', '#80bd91', '#72c8cc']

        d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => {
                console.log(res)
                vis.data = res;
                vis.color = d3.scaleOrdinal()
                    .domain(vis.data.map(d => d.pm_name))
                    .range(colors)

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
