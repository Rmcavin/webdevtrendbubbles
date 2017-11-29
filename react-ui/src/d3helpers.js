import * as d3 from 'd3';

export function d3draw(input) {

  //============process the data into proper [{},{}] format ====================
  let rawData = JSON.parse(input);
  let dataArray = [];
  for (let key in rawData) {
    dataArray.push({'word':key,'value':rawData[key]})
  }

  //================ INITIAL VALUES FOR THE CHART ===================
  function bubbleChart() {
    let width = 500,
        height = 500,
        columnForColors = "value",
        columnForRadius = "value",
        columnForText = "word"

  //================== SET UP THE CHART ==========================
    function chart(selection) {

      //=================== SELECT THE SVG ELEMENT ======================

      let svg = selection;
      svg.attr('width', width).attr('height', height);

      //================== TOOLTIPS ==================================

      let tooltip = d3.select('#graph').data(dataArray).enter()
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('color', 'black')
        .style('padding', '8px')
        .style('border-radius', '6px')
        .style('text-align', 'center')
        .style('font-family', 'arial')
        .style('width', '200px')
        .text('');

      //================== POSITION THE CIRCLES ========================

      let simulation = d3.forceSimulation(dataArray)
        .force("charge", d3.forceManyBody().strength(-200))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

      function ticked(e) {
        node.attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y
        })
      }

      //=================== SET THE COLOR SCALE =========================

      let colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

      //========== SCALE THE RADIUS VALUES BTWN 5 AND 25 ================
      var scaleRadius = d3.scaleLinear()
        .domain([d3.min(dataArray, function(d) {
          return +d[columnForRadius];
      }), d3.max(dataArray, function(d) {
          return +d[columnForRadius];
      })]).range([5, 50])

      //============= APPEND THE CIRCLES =============================

      var node = svg.selectAll("circle")
          .data(dataArray)
          .enter()
          .append("circle")
          .attr('r', function(d) {
              return scaleRadius(d[columnForRadius])
          })
          .style("fill", function(d) {
              return colorCircles(d[columnForColors])
          })
          .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
          .on('mouseover', function(d) {
            tooltip.html('<p>' + d[columnForText] + ': ' + d[columnForRadius] + '</p>' )
            return tooltip.style('visibility', 'visible')
          })
          .on('mousemove', function() {
            return tooltip.style('top', (d3.event.pageY - 5) + 'px').style('left', (d3.event.pageX + 5) + 'px')
          })
           .on('mouseout', function() {
             return tooltip.style('visibility', 'hidden')
           })
         }
  return chart;
  }

d3.select('#bubbles').data(dataArray).call(bubbleChart())
}
