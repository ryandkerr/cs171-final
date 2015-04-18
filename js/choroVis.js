var quantize = d3.scale.quantize()
  .domain([-20, 20])
  .range(d3.range(8).map(function(i) { return "q" + i + "-8"; })); 

var svg = d3.select("#choroVis")
  .append("svg")
  .attr("width", WIDTH)
  .attr("height", HEIGHT)

var projection = d3.geo.albersUsa()
  .scale(1000);

var path = d3.geo.path()
  .projection(projection);

var states = svg.append("g")
  .attr("class", "states");


d3.json("data/jsonMain.json", function(elecJSON) {
  ELECGLOBAL = elecJSON;

  updateVis()
})

function updateVis() {
  
  var state_paths = states.selectAll("path");
    // .data([elecJSON])

  state_paths.attr("class", function() { 
    // return "cat";
    var that = this;

    var noodle = "cat";

    ELECGLOBAL.forEach(function(d) {
      debugger;
      if(d.year == CURRENT_YEAR && d.state == that.id) {
        noodle = quantize(d.demPct - d.gopPct);
      }
    })

    return noodle;
     
  })


}