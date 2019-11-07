// @TODO: YOUR CODE HERE!
//setup
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;
//create svg
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transfrom", `translate(${margin.left}, ${margin.top})`);

//load csv
d3.csv("assets/data/data.csv").then(jData => {
    console.log(jData);
    // id, state, abbr, poverty, povertyMoe, age, ageMoe, income, incomeMoe, healthcare, healthcareLow,
    // healthcareHigh, obesity, obesityLow, obesityHigh, smokes, smokesLow, smokesHigh

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 25])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(50," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 25])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(50,0)")
        .call(d3.axisLeft(y));

    // Add dots
    var dot = svg.append("g")
        .selectAll("dot")
        .data(jData)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.healthcare); })
        .attr("cy", function (d) { return y(d.poverty); })
        .attr("r", 9)
        .style("fill", "#69b3a2")

    // Add text
    var dotLabels = svg.append("g")
        .selectAll(null)
        .data(jData)
        .enter()
        .append("text")
        .attr("x", function (d) { return x(d.healthcare); })
        .attr("y", function (d) { return y(d.poverty); })
        .text(function (d) { return d.abbr });



})
