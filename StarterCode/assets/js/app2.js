// @TODO: YOUR CODE HERE!

function scatterchart() {

var svgWidth = 960;
var svgHeight = 500;

var margin = {
top: 20,
right: 50,
bottom: 80,
left:50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create the SVG wrapper, then append the svg group with its size attributes
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Load Import Data from data.csv file
d3.csv("assets/data/data.csv").then(function(dData){

	console.log(dData);
	
    dData.forEach(function(data) {
		
		data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.abbr = data.abbr;
        
    });

 // Create a linear scale for X and Y
    var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(dData, d => d.poverty)+2])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(dData, d => d.healthcare)+2])
        .range([height, 0]);


  // Create two new functions passing our scales in as argumentse
  // These will be used to create the chart's axes
  
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them

    chartGroup.append("g")
    .call(leftAxis);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

 
  // Create one SVG circle per piece of Data
  
  
    chartGroup.selectAll("circle")
        .data(dData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 12)
        .attr("fill", "skyblue")
		.attr("stroke-width", "1")
        .attr("stroke", "lightgray")
		
	chartGroup.selectAll("rect")
		.data(dData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xLinearScale(d.poverty))
        .attr("dy", d => yLinearScale(d.healthcare)+5)  
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
		.attr("font-weight", "700")
        .attr("fill", "white");
    
        
	chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - 50)
      .attr("x", 0 -250)
      .attr("dy", "1em")
	  .attr("font-weight", "700")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2.5}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
	  .attr("font-weight", "700")
      .text("In Poverty (%)");
  




}).catch(function(error) {
  console.log(error);
});


}

scatterchart();