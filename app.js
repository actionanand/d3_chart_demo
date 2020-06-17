const dummy_data = [
    { id: 'd1', value: 13, name: 'India'},
    { id: 'd2', value: 10, name: 'England'},
    { id: 'd3', value: 17, name: 'USA'},
    { id: 'd4', value: 7, name: 'Germany'},
    { id: 'd5', value: 3, name: 'Sri Lanka'}
];

const MARGIN = {
    top: 20,
    bottom: 10
};
const CHART_WIDTH = 600;
const CHART_HEIGHT = 400 - MARGIN.top - MARGIN.bottom;

const x = d3.scaleBand().rangeRound([0, CHART_WIDTH]).padding(0.1);
const y = d3.scaleLinear().range([CHART_HEIGHT, 0]);

const chartContainer = d3.select('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT + MARGIN.top + MARGIN.bottom);

    x.domain(dummy_data.map((data) => data.name));
    y.domain([0, d3.max(dummy_data, d => d.value) + 3]);

const chart = chartContainer.append('g');

chart.append('g')
    .call(d3.axisBottom(x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${CHART_HEIGHT})`)
    .attr('color', 'forestgreen');

chart.selectAll('.bar')
    .data(dummy_data)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', x.bandwidth())
    .attr('height', (data) => CHART_HEIGHT - y(data.value))
    .attr('x', (data) => x(data.name))
    .attr('y', (data) => y(data.value));

chart.selectAll('.label')
    .data(dummy_data)
    .enter()
    .append('text')
    .text((data) => data.value)
    .attr('x', data => x(data.name) + x.bandwidth()/2)
    .attr('y', data => y(data.value) - 10)
    .attr('text-anchor', 'middle')
    .classed('label', true);
