import * as d3 from 'd3';
import config from '../../config'

const MARGIN = { TOP: 10, RIGHT: 10, BOTTOM: 50, LEFT: 70 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class TimespanChart {
    constructor(element) {
        const vis = this;
        vis.svg = d3.select(element)
            .append("svg")
                .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
                .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
            .append("g")
                .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
        
        d3.json(`${config.API_ENDPOINT}/data/timespan-data`)
            .header("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE1ODIxMjc2OTIsInN1YiI6Im5ld0BuZXcuY29tIn0.M0eFf626-0hWyVja7WzvvzqoGrdkLGIBTs0OhbhyXQA")
            .get(function(error, data) {
                console.log(data)
            })
    }
}