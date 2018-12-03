import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import d3Histogram from '../../../visualisations/D3Histogram';

class DepthChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.graphState = {
      xMin: Number.POSITIVE_INFINITY,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      bucketSize: 0.2,
      data: []
    };
  }

  getProps() {
    if (this.myRef)
      return {
        height: 400,
        width: this.myRef.current.offsetWidth
      };
    return {
      height: 0,
      width: 0
    };
  }

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);
    this.graphState.data = this.bucket(this.props.buys);
    d3Histogram.create(el, this.getProps(), this.graphState);
  }

  componentDidUpdate() {
    this.graphState.xMin = Number.POSITIVE_INFINITY;
    this.graphState.xMax = 0;
    this.graphState.yMax = 0;
    this.graphState.data = this.bucket(this.props.buys, '#080').concat(
      this.bucket(this.props.sells, '#800')
    );

    d3Histogram.setScale(this.getProps(), this.graphState);
    d3Histogram.updateAxis(this.getProps());
    d3Histogram.drawBar(this.getProps(), this.graphState);
  }

  bucket(series, type) {
    const round = num =>
      Math.round(num / this.graphState.bucketSize) * this.graphState.bucketSize;
    const bucketed = {};
    for (var i = 0; i < series.length; i++) {
      const rounded = round(series[i].price);
      let bucket = bucketed[rounded];
      if (!bucket) {
        bucket = { price: rounded, quantity: 0 };
        if (bucket.price > this.graphState.xMax)
          this.graphState.xMax = bucket.price;
        if (bucket.price < this.graphState.xMin)
          this.graphState.xMin = bucket.price;

        bucketed[rounded] = bucket;
      }
      bucket.quantity += series[i].quantity;
      if (bucket.quantity > this.graphState.yMax)
        this.graphState.yMax = bucket.quantity;
    }
    return Object.keys(bucketed)
      .sort((a, b) => {
        return Number(a) - Number(b);
      })
      .map(price => ({ price, quantity: bucketed[price].quantity, type }));
  }

  render() {
    return <div ref={this.myRef} className="Chart" />;
  }
}
const mapStateToProps = store => ({
  sells: store.availableTrades.sells,
  buys: store.availableTrades.buys
});
DepthChart = connect(mapStateToProps)(DepthChart);

export default DepthChart;
