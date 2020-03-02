import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend'
import config from '../../config'
const colorbrewer = require('colorbrewer')

const MARGIN = 40;
const WIDTH = 350;
const HEIGHT = 300;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
const INNERRADIUS = 60;

export default class PieChart {

    constructor(element, info) {

        const vis = this;
        vis.svg = d3.select(element)
            .append("svg")
                .attr("viewBox", "0 0 350 300")
            .append("g")
                .attr("transform", `translate(${WIDTH/2 - 50}, ${HEIGHT/2})`)

        d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => {
                if (res.length !== 0) {
                    const colors = colorbrewer.Spectral[res.length]
                    const arr = []
                    res.forEach(e => arr.push(parseInt(e.count)))
                    const total = arr.reduce((acc, el) => acc + el)
                    if (res.length === 1) {
                        res[0].color = '#66ba97'
                    } else if (res.length === 2) {
                        res[0].color = '#66ba97';
                        res[1].color = '#fff5a8'
                    } else {
                        res.map((d, i) => d.color = colors[i])
                    }
                    res.sort((a, b) => b.count - a.count)
                    vis.data = res;
                    vis.color = d3.scaleOrdinal()
                        .domain(vis.data.map(d => d.pm_name))
                        .range(vis.data.map(d => d.color))

                    vis.pie = d3.pie()
                        .value(d => d.value.count)

                    vis.data_ready = vis.pie(d3.entries(vis.data))

                    vis.info = d3.select(element)
                        .append("div")
                        .attr("class", "info")
                        .style("opacity", 0)

                    vis.svg
                        .selectAll('whatever')
                        .data(vis.data_ready)
                        .enter()
                        .append('path')
                        .attr('d', d3.arc()
                            .innerRadius(INNERRADIUS)         // This is the size of the donut hole
                            .outerRadius(RADIUS)
                        )
                        .attr('fill', function(d){ return(vis.color(d.data.key)) })
                        .style("stroke-width", "2px")
                        .style("opacity", 0.7)
                        .on("mouseover", function(d) {
                            d3.select(this)
                                .style("cursor", "pointer")
                                .transition()
                                .duration(300)
                                .attr("d", d3.arc().innerRadius(INNERRADIUS).outerRadius(RADIUS + 10));
                            d3.select(info)
                                .style("opacity", 1)
                                .append("text")
                                    .attr("class", "text")
                                    .text(`${d.data.value.pm_name} - ${Math.round((d.data.value.count*100)/total)}%`)
                        })
                        .on("mouseout", function(d) {
                            d3.select(this).transition()
                            .duration(500)
                            .attr("d", d3.arc().innerRadius(INNERRADIUS).outerRadius(RADIUS))

                            d3.select(info)
                                .style("opacity", 0)
                                .select(".text")
                                .remove()
                        })

                    vis.svg.append("g")
                        .attr("class", "legendOrdinal")
                        .attr("transform", "translate(150, -100)")
                        .attr("font-size", 12)

                    const legendOrdinal = legendColor()
                        .labelFormat(d3.format(".2f"))
                        .shape("path", d3.symbol().type(d3.symbolCircle).size(150)())
                        .shapePadding(10)
                        .cellFilter(d => isNaN(Number(d.label)))
                        .scale(vis.color)

                    vis.svg.select(".legendOrdinal")
                        .call(legendOrdinal)
                } else {
                    return 'No data yet'
                }
                

            })
        
    }
}
