import React, { useRef, useEffect } from 'react';
import { select, selectAll, scaleOrdinal, pie, arc, pointer } from 'd3';

const margin = { left: 40, right: 40, top: 40, bottom: 40 };
const width = 350;
const height = 300;
const radius = Math.min(width, height) / 2 - margin.top;
const innerRadius = 60;

const legendCircleRadius = 6;

const chartColors = ['#98C0DD', '#EC7376', '#8F91D6', '#FDE38D', '#90D1A1']

const PieChart = ({ data }) => {
    const d3svg = useRef(null)

    const createChart = () => {
        // basic chart creation
        let svg = select(d3svg.current)
            .attr("viewBox", "0 0 350 300")
            .style("position", "relative")

        let g = svg
            .append("g")
            .attr("id", "main")
            .attr("transform", `translate(${width / 2 - 60}, ${height / 2})`)

        const color = scaleOrdinal()
            .domain(data)
            .range(chartColors)

        const chartPie = pie().value(d => d.count)
        const chartArc = arc().innerRadius(innerRadius).outerRadius(radius)

        const arcs = g.selectAll("arc")
            .attr("class", "arcs")
            .data(chartPie(data))
            .enter()
            .append("g")

        const segment = arcs.append("path")
            .attr("id", "segment")
            .attr("fill", (d, i) => color(i))
            .attr("opacity", 0.9)
            .attr("d", chartArc)

        // add legend
        let legend = svg.append('g')
            .attr("transform", `translate(${width - 90}, ${radius})`)
            .attr('id', 'legend')
            .selectAll()
            .data(data.map(d => d.pm_name))
            .join('g')
            // Creates group for every category, spaced vertically 10px apart
            .attr('transform', function (d, i) {
                return `translate(${legendCircleRadius}, ${i * 22 + legendCircleRadius})`;
            })

        legend.append('circle')
            .attr('class', 'circle')
            .attr('fill', (d, i) => color(i))
            .attr('r', legendCircleRadius)

        legend.append('text')
            .attr('class', 'text')
            .text(d => d)
            .attr('dy', '0.4em')
            .attr('x', 15)
            .style("font-size", "12.5px")

        // add tooltip
        const tooltipGroup = svg.append("g")
            .classed("tooltip", true)
            .attr("transform", `translate(-9999, -9999)`)

        const tooltipRect = tooltipGroup.append("rect")
            .style("fill", "#383c41")
            .style("opacity", 0.8)
            .attr("ry", 4)
            .attr("rx", 4)

        const tooltipText = tooltipGroup.append("g")
            .append("text")

        // update tooltip position + content
        segment.on("mousemove", function (event) {
            let segment = select(this);

            segment
                .classed("active", true)
                .style("cursor", "pointer")

            selectAll("#segment:not(.active)")
                .transition()
                .duration(200)
                .style("opacity", 0.6);

            const { pm_name, count } = segment.datum().data;
            const total = data.reduce((acc, d) => acc + d.count, 0)
            const percentage = Math.round((count / total) * 100);
            let tooltipString = `${pm_name}: ${count} requests (${percentage}%)`;
            let mouseCoords = pointer(event);

            tooltipGroup
                .attr("transform", `translate(${mouseCoords[0] + 125}, ${mouseCoords[1] + 135})`)

            tooltipText
                .attr("transform", `translate(10, 18)`)
                .text(tooltipString)
                .style("fill", "white")
                .style("font-size", "10px")

            const tooltipHeight = tooltipText.node().getBoundingClientRect().height;
            const tooltipWidth = tooltipText.node().getBoundingClientRect().width;

            tooltipRect
                .attr("width", tooltipWidth)
                .attr("height", tooltipHeight + 15)

        })
        segment.on("mouseout", function (d) {
            select(this)
                .classed("active", false)

            tooltipGroup.attr("transform", `translate(-9999, -9999)`)

            selectAll("#segment")
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
    }

    const updateChartValues = () => {
        const main = select("#main")
        const legend = select("#legend")
        const tooltip = select(".tooltip")
        main.remove()
        legend.remove()
        tooltip.remove()

        createChart()
    }

    useEffect(() => {
        if (data && d3svg.current) {
            createChart()
        }
    }, [])

    useEffect(() => {
        if (data && d3svg.current) {
            updateChartValues()
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
}

export default PieChart;

// const svg = this;
//         svg.svg = select(element)
//             .append("svg")
//             .attr("viewBox", "0 0 350 300")
//             .append("g")
//             .attr("transform", `translate(${width / 2 - 50}, ${height / 2})`)

//         //Fetches data on the number of all listItems by PM
//         json(`${config.API_ENDPOINT}/data/pm-data`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
//             .then(res => {

//                 //Only renders chart if there is data in the response
//                 if (res.length !== 0) {
//                     //Generates colors to be used in the chart using colorbrewer library
//                     //colorbrewer takes a color scheme (in this case Spectral) and a number of colors to be generated in the array
//                     //Note: this only works with values between 3-11. Number of PMs should usually fall in this range but additional colors might need to be added if not
//                     const colors = colorbrewer.Spectral[res.length]
//                     //Gets total number of list items to be used later to calculate percentage for the mouseover function
//                     const arr = []
//                     res.forEach(e => arr.push(parseInt(e.count)))
//                     const total = arr.reduce((acc, el) => acc + el)
//                     //Manually sets colors if number of PMs is less than 3, otherwise maps count values to colors generated by colorbrewer
//                     if (res.length === 1) {
//                         res[0].color = '#66ba97'
//                     } else if (res.length === 2) {
//                         res[0].color = '#66ba97';
//                         res[1].color = '#fff5a8'
//                     } else {
//                         res.map((d, i) => d.color = colors[i])
//                     }
//                     //Sorts values by count
//                     res.sort((a, b) => b.count - a.count)
//                     svg.data = res;
//                     svg.color = scaleOrdinal()
//                         .domain(svg.data.map(d => d.pm_name))
//                         .range(svg.data.map(d => d.color))

//                     svg.pie = pie()
//                         .value(d => d.value.count)

//                     svg.data_ready = svg.pie(bin(svg.data))

//                     svg.info = select(element)
//                         .append("div")
//                         .attr("class", "info")
//                         .style("opacity", 0)

//                     svg.svg
//                         .selectAll('whatever')
//                         .data(svg.data_ready)
//                         .enter()
//                         .append('path')
//                         .attr('d', arc()
//                             .innerRadius(innerRadius) // This is the size of the donut hole
//                             .outerradius(radius)
//                         )
//                         .attr('fill', function (d) { return (svg.color(d.data.key)) })
//                         .style("stroke-width", "2px")
//                         .style("opacity", 0.7)
//                         .on("mouseover", function (d) {
//                             select(this)
//                                 .style("cursor", "pointer")
//                                 .transition()
//                                 .duration(300)
//                                 .attr("d", arc().innerRadius(innerRadius).outerradius(radius + 10));
//                             select(info)
//                                 .style("opacity", 1)
//                                 .append("text")
//                                 .attr("class", "text")
//                                 .text(`${d.data.value.pm_name} - ${Math.round((d.data.value.count * 100) / total)}%`)
//                         })
//                         .on("mouseout", function (d) {
//                             select(this).transition()
//                                 .duration(500)
//                                 .attr("d", arc().innerRadius(innerRadius).outerradius(radius))

//                             select(info)
//                                 .style("opacity", 0)
//                                 .select(".text")
//                                 .remove()
//                         })

//                     svg.svg.append("g")
//                         .attr("class", "legendOrdinal")
//                         .attr("transform", "translate(150, -100)")
//                         .attr("font-size", 12)

//                     // const legendOrdinal = legendColor()
//                     //     .labelFormat(format(".2f"))
//                     //     .shape("path", symbol().type(symbolCircle).size(150)())
//                     //     .shapePadding(10)
//                     //     .cellFilter(d => isNaN(Number(d.label)))
//                     //     .scale(svg.color)

//                     // svg.svg.select(".legendOrdinal")
//                     //     .call(legendOrdinal)
//                 } else {
//                     return 'No data yet'
//                 }


//             })

//     }
