import React, { Component } from 'react';

const initialFrequency = 5;

const normalDistributed = (mean, variance) => {
  var u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  // generate a number normally distributed mean 0, variance 1 using Box-Muller
  let result = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  // something funny is going on with floating point, if this is the case then get another number
  if (result < -4 || result > 4)
    result = normalDistributed(0, 1);

  // transform to required distribution space
  result *= variance;
  result += mean;
  if (result < 0) {
    console.log({u, v, result});
  }
  return result;
};

const exponentialDistributed = rate => {
  var u = Math.random();
  const result = (-1 * Math.log(1 - u)) * 2 * rate;
  return result;
};

class BotView extends Component {
  constructor() {
    super();
    this.state = {
      frequency: initialFrequency,
      price: 100,
      priceSD: 3,
      quantity: 10,
      quantitySD: 2
    };

    this.live = true;
  }

  sendTrades() {
    const price = normalDistributed(this.state.price, this.state.priceSD);
    const quantity = normalDistributed(
      this.state.quantity,
      this.state.quantitySD
    );
    const delay = exponentialDistributed(this.state.frequency);

    const action = Math.random() > 0.5 ? 'buy' : 'sell'
    setTimeout(() => {
      if (this.live) {
        this.props.socket.emit('receive trade', {
          price: price,
          quantity: quantity,
          user: this.state.name,
          action: action
        });
        this.sendTrades();
      }
    }, delay * 1000);
  }

  componentDidMount() {
    this.setState({
      name: this.props.name
    });
    this.props.socket.emit('change active user', this.botName);

    this.sendTrades();
  }

  componentWillUnmount() {
    this.live = false;
  }

  render() {
    return (
      <div className="card mb-4 shadow-sm">
        <div>
          <label>Bot name:</label>
          <input
            value={this.props.name}
            onChange={event => {
              this.setState({ name: event.target.value });
            }}
          />
        </div>
        <div>
          <label>Average trade frequency (seconds):</label>
          <input
            value={initialFrequency}
            type="number"
            onChange={event => {
              this.setState({ frequency: event.target.value });
            }}
          />
        </div>
        <div>
          <label>Average trade price:</label>
          <input
            value={100}
            type="number"
            onChange={event => {
              this.setState({ price: event.target.value });
            }}
          />
        </div>
        <div>
          <label>Trade price standard deviation:</label>
          <input
            value={10}
            type="number"
            onChange={event => {
              this.setState({ priceSD: event.target.value });
            }}
          />
        </div>
        <div>
          <label>Average trade quantity:</label>
          <input
            value={10}
            type="number"
            onChange={event => {
              this.setState({ quantity: event.target.value });
            }}
          />
        </div>
        <div>
          <label>Trade quantity standard deviation:</label>
          <input
            value={2}
            type="number"
            onChange={event => {
              this.setState({ quantitySD: event.target.value });
            }}
          />
        </div>
      </div>
    );
  }
}

export default BotView;
