import * as d3 from 'd3';


var d3Histogram = {};
d3Histogram.spacing = {
  leftAxisMargin: 30,
  bottomAxisMargin: 30
};

d3Histogram.create = function(el, props, state) {
  d3Histogram.svg = d3
    .select(el)
    .append('svg')
    .attr('className', 'chart')
    .attr('width', props.width)
    .attr('height', props.height)
    .append('g')
    .attr('transform', 'translate(' + this.spacing.leftAxisMargin + ',0)');

  this.drawAxes(props, state);
};

d3Histogram.drawAxes = function(props, state) {
  this.yScale = d3.scaleLinear();
  this.yAxis = d3.axisLeft();

  this.xScale = d3.scaleLinear();
  this.xAxis = d3.axisBottom();

  this.setScale(props, state);

  this.svg
    .append('g')
    .attr('class', 'x axis')
    .call(this.xAxis)
    .attr(
      'transform',
      'translate(0,' + (props.height - this.spacing.bottomAxisMargin) + ')'
    );
  this.svg
    .append('g')
    .attr('class', 'y axis')
    .call(this.yAxis);
};

d3Histogram.setScale = function(props, state) {
  this.xScale
    .domain([state.xMin, state.xMax + state.bucketSize])
    .range([0, props.width - this.spacing.leftAxisMargin]);
  this.xAxis.scale(this.xScale);
  this.yScale
    .domain([state.yMax, state.yMin])
    .range([0, props.height - this.spacing.bottomAxisMargin]);
  this.yAxis.scale(this.yScale);
};

d3Histogram.updateAxis = function(props) {
  var t = d3.transition().duration(50);
  this.svg
    .select('.x')
    .transition(t)
    .call(this.xAxis);
  this.svg
    .select('.y')
    .transition(t)
    .call(this.yAxis);
  this.svg
    .selectAll('line.y')
    .data(this.yScale.ticks(10))
    .enter()
      .append('line')
      .attr('class', 'y')
      .attr('x1', 0)
      .attr('x2', props.width - this.spacing.leftAxisMargin)
      .attr('y1', this.yScale)
      .attr('y2', this.yScale)
      .style('stroke', '#ccc')
    .exit().remove();
};

d3Histogram.drawBar = function(props, state) {
  const xScale = this.xScale;
  const yScale = this.yScale;

  this.svg.select('g.bars').remove();
  this.svg.append('g')
    .attr('class', 'bars')
    .selectAll('rect.bar')
    .data(state.data)
    .enter()
      .append('rect')
      .attr('class', key => 'bar ' + key.type)
      .attr('x', key => this.xScale(key.price))
      .attr('y', key => yScale(key.quantity) + 'px')
      .attr('width', xScale(state.bucketSize) - xScale(0.0) + 'px')
      .attr('height', key => props.height - this.spacing.bottomAxisMargin - yScale(key.quantity) + 'px' )
      .attr('price', key => key.price)
      .attr('quantity', key => key.quantity)
      .attr('fill', key => key.type)
    .exit()
    .remove();
};

export default d3Histogram;
