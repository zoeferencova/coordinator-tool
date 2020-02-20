import React, { Component } from 'react';

import * as d3 from 'd3';
import config from '../../config'

const MARGIN = 40;
const WIDTH = 450;
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
        
        const colors = ['#e8b082' ,'#d15c5c', '#97c9d1', '#faf0b1', '#8176b5', '#80bd91', '#72c8cc', '#d9adbf', '#30337a', '#31702c']

        d3.json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
            .then(res => {
                console.log(res)
                vis.data = res;
                vis.color = d3.scaleOrdinal()
                    .domain(vis.data)
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
            })

        console.log(colors)

        
    }
}
