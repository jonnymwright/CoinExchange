import { Component } from 'react';

const datetimeToTimeInterval = datetime => {
  const timeDivisions = [
    { unit: 's', divisor: 1000 },
    { unit: 'm', divisor: 60 },
    { unit: 'h', divisor: 60 },
    { unit: 'd', divisor: 24 },
    { unit: 'w', divisor: 7 },
    { unit: 'y', divisor: 52 }
  ];
  let result = new Date() - datetime;
  let justNow = true;
  let unit = 'millis';

  for (let i = 0; i < timeDivisions.length; i++) {
    let candidate = result / timeDivisions[i].divisor;
    if (candidate < 1) {
      if (justNow) return 'Just now';
      return '' + Math.round(result) + unit;
    } else {
      result = candidate;
      unit = timeDivisions[i].unit;
      justNow = false;
    }
  }
};

class TradeTimeView extends Component {

  componentDidMount() {
    this.reRenderInterval = setInterval(() => {this.setState({});}, 1000 * 60)
  }

  componentWillUnmount() {
    if (this.reRenderInterval) {
      clearInterval(this.reRenderInterval);
    }
  }

  render() {
    return datetimeToTimeInterval(this.props.time);
  }
}
export default TradeTimeView;
