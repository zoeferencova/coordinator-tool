import * as d3 from 'd3';
import config from '../../config'

const MARGIN = { TOP: 10, RIGHT: 10, BOTTOM: 50, LEFT: 70 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class TimespanChart {
    constructor(element, data) {
        const svg = d3.select(element)
            .append("svg")
            .attr("width", 800)
            .attr("height", 500)
        
        const rects = svg.selectAll("rect")
            .data(data)

        // rects.enter().append("rect")
        //     .attr("x", 100)
        //     .attr("y", 0)
        //     .attr("width", 5)
        //     .attr("height", 100)
        //     .attr("fill", "grey")
    }
}
